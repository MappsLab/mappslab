#!/bin/bash
# set -e to throw errors and stop travis
set -e

export DEPLOY_ENV=$1

echo "DEPLOY_ENV: $DEPLOY_ENV"

if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^api/"
	then 
	echo "*     * * *     *"
	echo "⚗️  Testing API"
	echo "*     * * *     *"
	npm run db:test:init
	sleep 15
	npm run db:test:start
	sleep 15
	npm run db:test:seed
	npm run test:api

	echo "*     * * *     *"
	echo "⚗️  API Tests passed. Compiling.."
	echo "*     * * *     *"


	echo "🛠  BUILD  - Environment: $DEPLOY_ENV"
	echo "🛠  Compiling App to ./.build/api "

	rm -rf ./build/api
	npm run build:api

	echo "🛠  Successfully compiled. Copying configuration files.."	

	cp ./api/package.json ./build/api/

	if [ "$DEPLOY_ENV" = "production" ]
		then
		cp ./api/now.production.json ./build/api/now.json
		cp ./api/.env.production ./build/api/.env
	else
		cp ./api/now.staging.json ./build/api/now.json
		cp ./api/.env.staging ./build/api/.env
	fi
fi

if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^app/"
	then
	echo "*     * * *     *"
	echo "⚗️  Testing App"
	echo "*     * * *     *"
	npm run test:app

	echo "*     * * *     *"
	echo "⚗️  App tests passed. Compiling.."
	echo "*     * * *     *"
	echo "🛠  BUILD  - Environment: $DEPLOY_ENV"

	echo "🛠  Building packages.."

	cd ./packages/mapp
	npm run build

	cd $TRAVIS_BUILD_DIR


	echo "🛠  Compiling App to ./build/web "

	rm -rf ./build/web
	mkdir -p ./build/web

	echo "🛠  Copying configuration files.."

	if [ "$DEPLOY_ENV" = "production" ]
		then
		npm run build:app
		cp -r public/* ./build/web
		mv ./build/web/now.production.json ./build/web/now.json
	else
		npm run build:app
		cp -r public/* ./build/web
		mv ./build/web/now.staging.json ./build/web/now.json
	fi

fi

echo "*     * * *     *"
echo "⚗️   Done running tests"
echo "*     * * *     *"
