FROM node:10@sha256:c00e4cb3acfb2a0c4997ddb0e809cba37f9f6cce43efa9a6e6f7f1a79e094ab5

ADD package*.json ./
RUN npm install

ADD . .

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
