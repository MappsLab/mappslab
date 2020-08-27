// @flow
import convict from 'convict'
import path from 'path'

const env = process.env.NODE_ENV

const envFile = env ? `.env.${env}` : '.env.development'

require('dotenv').config({
	path: path.resolve(__dirname, '..', envFile),
})

console.log(process.env.DATABASE_ADDRESS)
console.log(process.env.JWT_KEY)
console.log(process.env.AWS_ACCESS_KEY)
console.log(process.env.AWS_SECRET_KEY)
console.log(process.env.AWS_BUCKET_NAME)

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
		endpoint: {
			doc: 'AWS Endpoint URL',
			format: String,
			sensitive: false,
			default: undefined,
			env: 'AWS_ENDPOINT',
		},
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
		imageDirectory: {
			doc: 'AWS Bucket Image Directory',
			format: String,
			default: 'images',
			env: 'AWS_BUCKET_IMAGE_DIR',
		},
		tileDirectory: {
			doc: 'AWS Bucket Tile Image Directory',
			format: String,
			default: 'tiles',
			env: 'AWS_TILE_IMAGE_DIR',
		},
		kmlDirectory: {
			doc: 'AWS Bucket KML Directory',
			format: String,
			default: 'kml',
			env: 'AWS_BUCKET_KML_DIR',
		},
	},
})

export default config
