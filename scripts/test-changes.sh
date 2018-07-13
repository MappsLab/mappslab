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
	echo "⚗️  API Tests passed."
	echo "*     * * *     *"
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
fi

echo "*     * * *     *"
echo "⚗️   Done running tests"
echo "*     * * *     *"
