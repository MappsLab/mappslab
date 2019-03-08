#!/bin/bash
# set -e to throw errors and stop travis
set -e

if [ -z ${TRAVIS_BUILD_DIR+x} ]
	then
	TRAVIS_BUILD_DIR=$(pwd)
fi


export DEPLOY_ENV=$1

echo "DEPLOY_ENV: $DEPLOY_ENV"



# if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^api/"
	# then 
	echo "*     * * *     *"
	echo "⚗️  Testing API"
	echo "*     * * *     *"
	yarn workspace mappslab-api db:test:init
	sleep 5 
	yarn workspace mappslab-api db:test:seed
	yarn workspace mappslab-api test

	echo "*     * * *     *"
	echo "⚗️  API Tests passed."
	echo "*     * * *     *"


	# echo "🛠  BUILD  - Environment: $DEPLOY_ENV"
	# echo "🛠  Compiling App to ./.build/api "

	# npm run build:api

	# echo "🛠  Successfully compiled. Copying configuration files.."	

	# cp ./api/package.json ./build/api/

	# if [ "$DEPLOY_ENV" = "production" ]
	# 	then
	# 	cp ./api/.env.production ./api/dist/.env
	# else
	# 	cp ./api/.env.staging ./api/dist/.env
	# fi
# fi

# if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^app/"
	# then
	echo "*     * * *     *"
	echo "⚗️  Testing App"
	echo "*     * * *     *"
	npm run test:app

	echo "*     * * *     *"
	echo "⚗️  App tests passed"
	echo "*     * * *     *"
	echo "🛠  BUILD  - Environment: $DEPLOY_ENV"

	# echo "🛠  Building packages.."

	# npm run build:mapp

	# cd $TRAVIS_BUILD_DIR


	# echo "🛠  Compiling App to ./build/web "

	# rm -rf ./build/web
	# mkdir -p ./build/web

	# echo "🛠  Copying configuration files.."

	# if [ "$DEPLOY_ENV" = "production" ]
	# 	then
	# 	npm run build:app
	# 	cp -r public/* ./build/web
	# 	mv ./build/web/now.production.json ./build/web/now.json
	# else
	# 	npm run build:app
	# 	cp -r public/* ./build/web
	# 	mv ./build/web/now.staging.json ./build/web/now.json
	# fi

# fi

echo "*     * * *     *"
echo "⚗️   Done running tests"
echo "*     * * *     *"
