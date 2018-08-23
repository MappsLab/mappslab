// @flow
import type { express$Request, express$Response, express$Next } from 'express'
import { verifyJWT } from 'Utils/auth'

const debug = require('debug')('api')

const getCurrentViewer = async (req: express$Request, res: express$Response, next: express$Next) => {
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
