#!/bin/bash
set -e

help () {
  echo "Usage ./docker-dev-env.sh [command]"
  echo ""
  echo "Commands:"
  echo "  npm        Runs npm inside docker container."
  echo "  console    Runs console script inside docker container."
  echo "  up         Starts and demonises everything you need."
  echo "  down       Stops and removes everything you started."
  echo "  logs       Show app logs."
}

case $1 in

  npm)
    docker compose run --rm "$@"
  ;;

  console)
    docker compose run --rm npm run console "${@:2}"
  ;;

  up)
    docker compose up -d
  ;;

  down)
    docker compose down
  ;;

  logs)
     docker logs -f primarybyte-app
  ;;

  "")
    help
  ;;

  *)
    echo "[ERROR] Command '$1' is not supported."
    help
    exit 1
  ;;

esac

exit 0

