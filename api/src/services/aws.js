// @flow
import AWS from 'aws-sdk'
import type { ReadStream } from 'fs'
import config from '../config'

const debug = require('debug')('api')

const credentials = {
	accessKeyId: config.get('aws.accessKey'),
	secretAccessKey: config.get('aws.secretKey'),
}

const s3client = new AWS.S3({
	credentials,
	endpoint: config.get('aws.endpoint'),
})

type PutResponse = {
	ETag: string,
	Location: string,
	Key: string,
	Bucket: string,
}

export const upload = async (data: Buffer | ReadStream, name: string): Promise<PutResponse> =>
	new Promise((resolve) => {
		const bucketName = config.get('aws.bucketName')
		s3client.upload(
			{
				Bucket: bucketName,
				/* include the bucket name here. For some reason Localstack needs it */
				Key: `${bucketName}/${name}`,
				Body: data,
			},
			(err, response) => {
				if (err) throw err
				debug(`Uploaded file: ${name}`)
				resolve(response)
			},
		)
	})
