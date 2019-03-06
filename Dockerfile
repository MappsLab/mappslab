
FROM node:10

RUN apt-get update -y && \
	curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose && \
	chmod +x /usr/local/bin/docker-compose

COPY . .

RUN yarn install

CMD ["yarn", "test:api"]