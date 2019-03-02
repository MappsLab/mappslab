// @flow

import path from 'path'

require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

const { PORT: _PORT, JWT_KEY: _JWT_KEY, STAGING_DATABASE_ADDRESS, TEST_DATABASE_ADDRESS } = process.env

const address = process.env.TEST_DB ? TEST_DATABASE_ADDRESS : STAGING_DATABASE_ADDRESS

export const PORT = _PORT || 3000
export const JWT_KEY = _JWT_KEY || 'xyz'
export const database = {
	address,
}
