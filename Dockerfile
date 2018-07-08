FROM node:9-alpine

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install 

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 4000

CMD ["yarn","serve"]