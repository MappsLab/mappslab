// @flow

const apiRoot = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/graphql' : 'https://mappslab-api.now.sh/graphql'
const wsUri = process.env.NODE_ENV === 'development' ? 'ws://localhost:3000/graphql' : 'wss://mappslab-api.now.sh/graphql'
const imageBucketRoot =
	process.env.NODE_ENV === 'development' ? 'http://mappslab-beta.localhost:4572/' : 'https://mappslab-beta.s3.amazonaws.com/'

export default {
	apiRoot,
	wsUri,
	imageBucketRoot,
}
