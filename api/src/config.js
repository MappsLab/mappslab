// @flow

import path from 'path'

const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env.staging'

require('dotenv').config({
	path: path.resolve(__dirname, '..', envFile),
})

const { ENV, PORT: _PORT, JWT_KEY: _JWT_KEY, DATABASE_ADDRESS, TEST_DATABASE_ADDRESS } = process.env

const address = ENV === 'test' ? TEST_DATABASE_ADDRESS : DATABASE_ADDRESS

export const PORT = _PORT || 3000
export const JWT_KEY = _JWT_KEY || 'xyz'
export const database = {
	address,
}
