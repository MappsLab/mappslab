#!/bin/bash
# set -e to throw errors and stop travis
set -e
x=''

if [ -z ${TRAVIS_BUILD_DIR+x} ]
	then
	TRAVIS_BUILD_DIR=$(pwd)
fi


# # if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^api/"
# 	# then 
# 	echo "*     * * *     *"
# 	echo "🚀 Deploying API"
# 	echo "*     * * *     *"
# 	cd $TRAVIS_BUILD_DIR

# 	# if [ "$TRAVIS" == true ]
# 		# then
# 		cd ./build/api
# 		echo "🛠  Deploying to now"
# 		now -e 
# 		# now -e --token $NOW_TOKEN
# 		echo "🛠  Creating alias"
# 		now alias 
# 		# now alias --token $NOW_TOKEN
# 		echo "🛠  Build complete! 🎉"
# # 	fi
# # fi



# if git diff --name-only $TRAVIS_COMMIT_RANGE | grep "^app/"
# 	then
	echo "*     * * *     *"
	echo "🚀  Deploying App"
	echo "*     * * *     *"
	cd $TRAVIS_BUILD_DIR

	
	# if [ "$TRAVIS" = true ]
	# 	then
		cd ./build/web
		echo "🛠  Deploying to now"
		now -e 
		# now -e --token $NOW_TOKEN
		echo "🛠  Creating alias"
		now alias 
		# now alias --token $NOW_TOKEN
		echo "🛠  Build complete! 🎉"
	# fi
# fi

echo "*     * * *     *"
echo "🚀  Done deploying"
echo "*     * * *     *"
