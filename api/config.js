// @flow

import path from 'path'

require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

const { PORT } = process.env

module.exports = {
	PORT,
}
