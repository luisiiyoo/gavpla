FROM node:12

ARG FRONT_PORT

COPY . /app

WORKDIR /app

RUN yarn install

EXPOSE ${FRONT_PORT}

CMD yarn start
