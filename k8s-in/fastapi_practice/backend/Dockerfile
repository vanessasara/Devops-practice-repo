# Use a lightweight Python base image
FROM python:3.12-slim-bookworm

# Copy the uv binaries from the official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy the project into the image
ADD . /app

# Set the working directory
WORKDIR /app

# Sync the project environment using uv
RUN uv sync --locked

# Set the default command to run the application
CMD ["uv", "run", "main.py"]