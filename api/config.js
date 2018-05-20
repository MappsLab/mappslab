// @flow

import path from 'path'

require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

const { PORT, JWT_KEY } = process.env

module.exports = {
	PORT,
	JWT_KEY,
}
