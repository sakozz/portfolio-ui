# syntax=docker/dockerfile:1.0.0-experimental
ARG   NODE_VERSION=20.9.0
ARG   NG_CLI_VERSION=16.0.2
ARG   IMAGE_OS=buster-slim

FROM  node:${NODE_VERSION}-${IMAGE_OS} as build

WORKDIR /app
COPY    package*.json .
RUN     npm ci
COPY    . .
RUN     npm run build


FROM    nginx:alpine
COPY    --from=build /app/dist /usr/share/nginx/html
EXPOSE  ${NGINX_PORT}

