// @flow

const apiRoot = process.env.NODE_ENV === 'developmenta' ? '/api' : 'https://mappslab-api.now.sh'

export default {
	apiRoot,
}
