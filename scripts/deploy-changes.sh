#!/bin/bash
# set -e to throw errors and stop travis
set -e

if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^api/"
	then 
	echo "*     * * *     *"
	echo "🚀 Deploying API"
	echo "*     * * *     *"
	cd $TRAVIS_BUILD_DIR

	if [ "$TRAVIS" == true ]
		then
		cd ./build/api
		echo "🛠  Deploying to now"
		now -e --token $NOW_TOKEN
		echo "🛠  Creating alias"
		now alias --token $NOW_TOKEN
		echo "🛠  Build complete! 🎉"
	fi
fi

if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^placeholder/"
	then
	echo "*     * * *     *"
	echo "🚀  Deploying Placeholder"
	echo "*     * * *     *"
	cd $TRAVIS_BUILD_DIR
	cd ./placeholder
	npm run build
	now --token $NOW_TOKEN
	now alias --token $NOW_TOKEN
fi

if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^app/"
	then
	echo "*     * * *     *"
	echo "🚀  Deploying App"
	echo "*     * * *     *"
	cd $TRAVIS_BUILD_DIR
	
	if [ "$TRAVIS" = true ]
		then
		cd ./build/web
		echo "🛠  Deploying to now"
		now -e --token $NOW_TOKEN
		echo "🛠  Creating alias"
		now alias --token $NOW_TOKEN
		echo "🛠  Build complete! 🎉"
	fi
fi

echo "*     * * *     *"
echo "🚀  Done deploying"
echo "*     * * *     *"
