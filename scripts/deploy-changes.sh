#!/bin/bash
# set -e to throw errors and stop travis
set -e
x=''


# if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^api/"
	# then 
	echo "*     * * *     *"
	echo "🚀 Deploying API"
	echo "*     * * *     *"

	yarn workspace mappslab-api deploy

	echo "🛠  Build complete! 🎉"
# fi



# if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^app/"
# 	then
	echo "*     * * *     *"
	echo "🚀  Deploying App"
	echo "*     * * *     *"
	yarn workspace @mappslab/mapp build
	yarn workspace mappslab-app deploy
	
	echo "🛠  Build complete! 🎉"

# fi

echo "*     * * *     *"
echo "🚀  Done deploying"
echo "*     * * *     *"
