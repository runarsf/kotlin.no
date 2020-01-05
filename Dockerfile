FROM node:12.10.0

MAINTAINER runarsf <root@runarsf.dev>

COPY . /app

WORKDIR "/app"

RUN npm install -g sass \
 && npm install

CMD ["npm", "run", "serve"]
