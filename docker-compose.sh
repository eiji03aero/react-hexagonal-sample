#!/bin/bash

cmd=${1:-up}
project_name="react-hexagonal-sample"
container_name="workspace"

execute-docker-compose () {
  docker-compose \
    -p $project_name \
    -f 'docker-compose.yml' \
    $@
}

stop-docker-compose () {
  execute-docker-compose stop
}

if [ $cmd = 'up' ] && [ $# -le 1 ]; then
  execute-docker-compose up -d
  execute-docker-compose exec $container_name /bin/bash
  stop-docker-compose
elif [ $cmd = 'bash' ]; then
  execute-docker-compose exec $container_name /bin/bash
else
  execute-docker-compose $@
fi
