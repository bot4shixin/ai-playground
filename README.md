# Deploy
## build docker
docker build ./ -t ai-playground

## run docker

docker run -d -p 4236:4236 ai-playground:latest pnpm start

## go into docker container

docker exec -it a15e098e266c /bin/bash

## copy db file from docker container

docker cp c2cd04dfa3aa:/usr/src/packages/prisma/db.sqlite /home/frontend/app/dragon/frontend/ai-playground-2


## copy db file from remote server

scp -i id_rsa frontend@10.10.4.92:/home/frontend/app/dragon/frontend/ai-playground-2/db.sqlite .



# Migrate
https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate


# reference
https://github.com/open-webui/open-webui
https://sdk.vercel.ai/
https://vercel.com/templates/next.js/nextjs-ai-chatbot
https://github.com/nat/openplayground


https://github.com/ollama-ui/ollama-ui

https://itsfoss.com/ollama-web-ui-tools/