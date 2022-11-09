# MAINTAINER pavlo@wesslogic.eu
# Current docker file represents 2-staged build for an angular application
# ready for production deployment

### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:11-alpine as builder

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build-prod

### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
