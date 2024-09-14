# base image
FROM node:lts

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

COPY package*.json ./

# install dependencies
RUN yarn install


COPY . .
RUN  cp -r ./node_modules/pspdfkit/dist/pspdfkit-lib ./public/pspdfkit-lib/

# start app
RUN yarn run build
EXPOSE 3000
