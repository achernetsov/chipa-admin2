# TODO cache node
# https://cli.vuejs.org/guide/deployment.html#docker-nginx
FROM node:latest as build-stage
WORKDIR /app
COPY package.json ./
#RUN npm config set registry http://registry.npmjs.org/
#RUN echo "104.16.26.35 registry.npmjs.org" > /etc/hosts
# RUN DEBUG=* npm install --verbose
RUN npm install
COPY ./ .

RUN npm run build
RUN rm -rf node_modules

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf