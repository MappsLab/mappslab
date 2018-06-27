// @flow

const apiRoot = process.env.NODE_ENV === 'development' ? '/api' : 'https://mappslab-api.now.sh'

export default {
	apiRoot,
}
