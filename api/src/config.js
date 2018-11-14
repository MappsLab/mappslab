// @flow

import path from 'path'

require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

const { PORT, JWT_KEY, DATABASE_ADDRESS } = process.env

module.exports = {
	PORT: PORT || 3000,
	JWT_KEY: JWT_KEY || 'xyz',
	database: {
		address: DATABASE_ADDRESS,
	},
}
