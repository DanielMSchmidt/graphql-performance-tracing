FROM node:16-alpine

ADD package*.json ./
RUN npm install

ADD . .

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
