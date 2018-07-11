// @flow

const apiRoot = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mappslab-api.now.sh'
const wsUri = process.env.NODE_ENV === 'development' ? 'ws://localhost:3000' : 'ws://mappslab-api.now.sh'

export default {
	apiRoot,
	wsUri,
}
