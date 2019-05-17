FROM mhart/alpine-node:10 
WORKDIR /app
COPY . /app 
# RUN mv .env.staging .env
RUN apk search --update imagemagick && apk add --no-cache --virtual .gyp python make g++ imagemagick
EXPOSE 3000 
RUN yarn install && yarn build
# ENV JWT_KEY=PGroGm8NZiG^p2*kwatz
# ENV DATABASE_ADDRESS=167.99.175.140:9080
# ENV NODE_ENV=staging
# ENV AWS_ACCESS_KEY=AKIAITYBYYU4D4PZB2HQ
# ENV AWS_SECRET_KEY=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
# ENV AWS_BUCKET_NAME='mappslab-beta'
CMD ["npm", "start"]
