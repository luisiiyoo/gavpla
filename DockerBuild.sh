#!/bin/bash

# Read environment variables needed
source DockerConfig.sh

docker build -t \
    ${APP_DIR}:${GIT_REVISION} \
    -f ./Dockerfile \
    --build-arg GIT_REVISION=${GIT_REVISION} \
    --build-arg FRONT_PORT=${FRONT_PORT} \
    .
