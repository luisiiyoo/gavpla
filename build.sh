#!/bin/bash
APP_DIR='cards-game-frontend'
GIT_REVISION='release'
FRONT_PORT=3030

docker build -t \
    ${APP_DIR}:${GIT_REVISION} \
    -f ./Dockerfile \
    --build-arg GIT_REVISION=${GIT_REVISION} \
    --build-arg FRONT_PORT=${FRONT_PORT} \
    .
