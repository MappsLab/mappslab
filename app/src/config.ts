const apiRoot =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000/graphql'
		: 'https://mappslab-beta-api.good-idea.studio/graphql'
const wsUri =
	process.env.NODE_ENV === 'development'
		? 'ws://localhost:3000/graphql'
		: 'wss://mappslab-beta-api.good-idea.studio/graphql'
const imageBucketRoot =
	process.env.AWS_BUCKET_ROOT || process.env.NODE_ENV === 'development'
		? 'http://mappslab-beta.localhost:4572/'
		: 'https://mappslab-beta.s3.amazonaws.com/'

// TODO: This doesn't actually work on localhost, the KML must
// be on a public URL.
// For now, use ngrok and update the dev URL below.

const dataLayerRoot =
	process.env.AWS_BUCKET_ROOT || process.env.NODE_ENV === 'development'
		? 'http://mappslab-beta.localhost:4572/'
		: 'https://mappslab-beta.s3.amazonaws.com/'

export const config = {
	apiRoot,
	wsUri,
	imageBucketRoot,
	dataLayerRoot,
}