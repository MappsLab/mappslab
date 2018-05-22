// @flow

const apiRoot = process.env.ENV === 'development' ? '/api' : '//mappslab-api.now.sh:3000'

export default {
	apiRoot,
}
