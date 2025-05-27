#!/bin/sh

echo "Docker-Entrypoint iniciado"

npm install
npm run migrate up

echo "Docker-Entrypoint finalizado"

exec "$@"