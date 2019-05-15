// @flow
import { setSchema } from '../setSchema'

const debug = require('debug')('api')

const run = async () => {
	await setSchema()
	debug('Updated schema')
}

run()
