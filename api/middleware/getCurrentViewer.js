// @flow
import { verifyJWT } from 'Utils/auth'

const debug = require('debug')('api')

const getCurrentViewer = async (req: express$Request, res, next) => {
	if (!req.headers.authorization) {
		req.viewer = null
		next()
		return
	}
	const token = req.headers.authorization.replace(/^Bearer /, '')
	try {
		const viewer = await verifyJWT(token)
		req.viewer = viewer
	} catch (e) {
		debug('JWT Validation Error:')
		debug(e)
	}
	next()
}

export default getCurrentViewer
