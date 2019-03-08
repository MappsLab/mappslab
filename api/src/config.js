// @flow
import convict from 'convict'
import path from 'path'

const env = process.env.NODE_ENV

const envFile = env ? `.env.${env}` : '.env.development'

require('dotenv').config({
	path: path.resolve(__dirname, '..', envFile),
})

// const {
// 	ENV,
// 	PORT: _PORT,
// 	JWT_KEY: _JWT_KEY,
// 	DATABASE_ADDRESS,
// 	TEST_DATABASE_ADDRESS,
// 	AWS_ACCESS_KEY,
// 	AWS_SECRET_KEY,
// 	AWS_BUCKET_NAME,
// } = process.env
// const address = ENV === 'test' ? TEST_DATABASE_ADDRESS : DATABASE_ADDRESS

// export const PORT = _PORT || 3000
// export const JWT_KEY = _JWT_KEY || 'xyz'
// export const database = {
// 	address,
// }

// // export const AWS_ACCESS_KEY
// export const aws = {
// 	AWS_ACCESS_KEY,
// 	AWS_SECRET_KEY,
// 	AWS_BUCKET_NAME,
// }

const config = convict({
	env: {
		doc: 'The application environment',
		format: ['production', 'staging', 'development', 'test'],
		default: 'development',
		env: 'ENV',
	},
	jwtKey: {
		doc: 'JWT Encryption Key',
		format: String,
		default: 'ilovefr@nk',
		env: 'JWT_KEY',
	},
	server: {
		port: {
			doc: 'The port to bind',
			format: 'port',
			default: 3000,
			env: 'PORT',
		},
	},
	db: {
		address: {
			doc: 'Database URL',
			format: 'url',
			default: 'localhost:9080',
			env: 'DATABASE_ADDRESS',
		},
	},
	aws: {
		accessKey: {
			doc: 'AWS Access key',
			format: String,
			sensitive: true,
			default: '',
			env: 'AWS_ACCESS_KEY',
		},
		secretKey: {
			doc: 'AWS Secret Key',
			format: String,
			sensitive: true,
			default: '',
			env: 'AWS_SECRET_KEY',
		},
		bucketName: {
			doc: 'AWS Bucket Name',
			format: String,
			default: 'mappslab-beta',
			env: 'AWS_BUCKET_NAME',
		},
	},
})

export default config
