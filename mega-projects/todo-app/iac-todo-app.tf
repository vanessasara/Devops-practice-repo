terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

############################
# Inputs (edit as needed)
############################

variable "aws_region" {
  description = "AWS region to deploy into."
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type."
  type        = string
  default     = "t3.small"
}

variable "key_name" {
  description = "Existing EC2 key pair name for SSH."
  type        = string
}

variable "ssh_cidr" {
  description = "CIDR allowed to SSH to the instance."
  type        = string
  default     = "0.0.0.0/0"
}

variable "todo_namespace" {
  description = "A name prefix for resources."
  type        = string
  default     = "todo-app"
}

variable "dockerhub_backend_image" {
  description = "Docker Hub image for backend (repo/name:tag)."
  type        = string
  default     = "venisasarah/todo-backend:latest"
}

variable "dockerhub_frontend_image" {
  description = "Docker Hub image for frontend (repo/name:tag)."
  type        = string
  default     = "venisasarah/todo-frontend:latest"
}

############################
# Networking (default VPC)
############################

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "todo_sg" {
  name        = "${var.todo_namespace}-sg"
  description = "Security group for todo-app EC2"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.todo_namespace}-sg"
  }
}

############################
# Instance
############################

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "todo" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  key_name                    = var.key_name
  subnet_id                   = data.aws_subnets.default.ids[0]
  vpc_security_group_ids      = [aws_security_group.todo_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/usr/bin/env bash
    set -euxo pipefail

    export DEBIAN_FRONTEND=noninteractive
    apt-get update
    apt-get install -y ca-certificates curl gnupg

    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    . /etc/os-release
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $VERSION_CODENAME stable" \
      > /etc/apt/sources.list.d/docker.list

    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    systemctl enable --now docker

    mkdir -p /opt/todo-app/nginx

    cat >/opt/todo-app/nginx/nginx.conf <<'NGINX'
    events {}
    http {
      server {
        listen 80;

        location / {
          proxy_pass http://frontend:3000;
        }

        location /api/ {
          proxy_pass http://backend:8000;
        }
      }
    }
    NGINX

    cat >/opt/todo-app/compose.yml <<'COMPOSE'
    services:
      frontend:
        image: ${dockerhub_frontend_image}
        restart: always

      backend:
        image: ${dockerhub_backend_image}
        restart: always
        environment:
          MONGO_URL: mongodb://mongodb:27017

      mongodb:
        image: mongo:7
        restart: always
        volumes:
          - mongo_data:/data/db

      nginx:
        image: nginx:latest
        restart: always
        ports:
          - "80:80"
        volumes:
          - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
        depends_on:
          - frontend
          - backend

    volumes:
      mongo_data:
    COMPOSE

    cd /opt/todo-app
    docker compose -f compose.yml up -d
  EOF

  tags = {
    Name = "${var.todo_namespace}-ec2"
  }
}

output "todo_app_public_ip" {
  value       = aws_instance.todo.public_ip
  description = "Public IP of the todo-app instance."
}

output "todo_app_url" {
  value       = "http://${aws_instance.todo.public_dns}"
  description = "HTTP URL for the todo-app (nginx)."
}

