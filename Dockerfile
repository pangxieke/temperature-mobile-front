# build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage
ENV DOLLAR="$"
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf.tmpl /etc/nginx/nginx.conf.tmpl
MAINTAINER 李 <test@test.com>
LABEL description="体温监测移动端"
CMD envsubst < /etc/nginx/nginx.conf.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
