// @flow

import path from 'path'

require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

const { PORT: _PORT, JWT_KEY: _JWT_KEY, DATABASE_ADDRESS } = process.env

export const PORT = _PORT || 3000
export const JWT_KEY = _JWT_KEY || 'xyz'
export const database = {
	address: DATABASE_ADDRESS,
}
