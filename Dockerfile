FROM node:9-alpine

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/


RUN npm install

COPY . /app

RUN npm run build

EXPOSE 4000

CMD ["npm","run","serve"]