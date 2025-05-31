#!/bin/sh

echo "Docker-Entrypoint iniciado"

npm install
npm run migrate

echo "Docker-Entrypoint finalizado"

exec "$@"