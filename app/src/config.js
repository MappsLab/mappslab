// @flow
const apiRoot =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000/graphql'
		: 'https://mappslab-api.now.sh/graphql'
const wsUri =
	process.env.NODE_ENV === 'development'
		? 'ws://localhost:3000/graphql'
		: 'wss://mappslab-api.now.sh/graphql'
const imageBucketRoot =
	process.env.AWS_BUCKET_ROOT || process.env.NODE_ENV === 'development'
		? 'http://mappslab-beta.localhost:4572/'
		: 'https://mappslab-beta.s3.amazonaws.com/'

/** Staging */
// const apiRoot = 'https://mappslab-api-staging.now.sh/graphql'
// const wsUri = 'wss://mappslab-api-staging.now.sh/graphql'
// const imageBucketRoot = 'https://mappslab-beta.s3.amazonaws.com/'

export default {
	apiRoot,
	wsUri,
	imageBucketRoot,
}
