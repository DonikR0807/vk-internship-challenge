# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npm", "run", "dev" ]
EXPOSE 5173