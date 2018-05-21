// @flow

const apiRoot = process.env.ENV === 'development' ? '/api' : '//mappslab-api.now.sh'

export default {
	apiRoot,
}
