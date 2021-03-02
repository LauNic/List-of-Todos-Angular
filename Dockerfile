# Stage 1
FROM node:15.10.0-alpine3.10 AS build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:1.19.7-alpine
COPY --from=build-step /app/dist/todo /usr/share/nginx/html
