FROM node:10@sha256:1201e1478ae2146ef699835a5726b1586e954b568962f5f937378d48de2e3014

ADD package*.json ./
RUN npm install

ADD . .

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
