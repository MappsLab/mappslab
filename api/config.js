// @flow

import path from 'path'

require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

const { PORT: _PORT, JWT_KEY: _JWT_KEY } = process.env

export const PORT = _PORT || 3000
export const JWT_KEY = _JWT_KEY || 'xyz'
