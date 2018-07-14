#!/bin/bash
# set -e to throw errors and stop travis
set -e

cd $TRAVIS_BUILD_DIR

echo "🛠  BUILD  - Environment: $DEPLOY_ENV"

# TODO: Test and build this 
echo "🛠  Building packages.."

cd ./packages/mapp
npm run build

cd $TRAVIS_BUILD_DIR

if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^api/"
	then 
	echo "*     * * *     *"
	echo "🚀 Deploying API"
	echo "*     * * *     *"
	cd $TRAVIS_BUILD_DIR

	if [ "$TRAVIS" == true ]
		then
		cd ./api
		echo "🛠  Deploying to now"

		if [ "$DEPLOY_ENV" = "production" ]
			then
			now -e --token $NOW_TOKEN --local-config now.production.json
			echo "🛠  Creating alias"
			now alias --token $NOW_TOKEN --local-config now.production.json
		else
			now -e --token $NOW_TOKEN --local-config now.staging.json
			echo "🛠  Creating alias"
			now alias --token $NOW_TOKEN --local-config now.staging.json
		fi

		echo "🛠  Build complete! 🎉"
	fi
fi



if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^app/"
	then
	echo "*     * * *     *"
	echo "🚀  Deploying App"
	echo "*     * * *     *"
	cd $TRAVIS_BUILD_DIR

	
	if [ "$TRAVIS" = true ]
		then
		cd ./app
		echo "🛠  Deploying to now"

		if [ "$DEPLOY_ENV" = "production" ]
			then
			now -e --token $NOW_TOKEN --local-config now.production.json
			echo "🛠  Creating alias"
			now alias --token $NOW_TOKEN --local-config now.production.json
		else
			now -e --token $NOW_TOKEN --local-config now.staging.json
			echo "🛠  Creating alias"
			now alias --token $NOW_TOKEN --local-config now.staging.json
		fi

		echo "🛠  Creating alias"
		now alias --token $NOW_TOKEN
		echo "🛠  Build complete! 🎉"
	fi
fi

echo "*     * * *     *"
echo "🚀  Done deploying"
echo "*     * * *     *"
