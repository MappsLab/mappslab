// @flow
import { verifyJWT } from '../utils/auth'

const debug = require('debug')('api')

const getCurrentViewer = async (req: express$Request, res, next) => {
	if (!req.headers.authorization) {
		req.viewer = null
		next()
		return
	}
	const token = req.headers.authorization.replace(/^Bearer /, '')
	const viewer = await verifyJWT(token).catch((err) => {
		debug('JWT Validation Error:')
		debug(err)
		req.viewer = null
		next()
	})
	req.viewer = viewer
	next()
}

export default getCurrentViewer
