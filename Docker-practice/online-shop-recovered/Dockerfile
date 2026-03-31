FROM node:24-trixie-slim AS builder

WORKDIR /app 

RUN npm install -g pnpm 

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

EXPOSE 3000

CMD ["pnpm","start"]
