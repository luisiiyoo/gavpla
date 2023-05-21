#!/bin/bash

# Read environment variables needed
source DockerConfig.sh

docker stop ${APP_DIR}-${GIT_REVISION}
docker rm ${APP_DIR}-${GIT_REVISION}

docker run -it \
        -p ${FRONT_PORT}:${FRONT_PORT} \
        --name ${APP_DIR}-${GIT_REVISION} \
        ${APP_DIR}:${GIT_REVISION}

GET_CONTAINER_ID_COMMAND="docker ps -aqf name=${APP_DIR}-${GIT_REVISION}"
CONTAINER_ID=$(eval "${GET_CONTAINER_ID_COMMAND}")
docker logs -f ${CONTAINER_ID}

# Remove all untagged images: docker rmi -f $(docker images | grep "^<none>" | awk "{print $3}")
# Execute the container on terminal: docker exec -it cards-game-frontend-release /bin/bash
# Show all the containers: docker ps -a
# Show all the images: docker images

