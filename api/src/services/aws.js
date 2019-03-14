// @flow
import AWS from 'aws-sdk'
import type { ReadStream } from 'fs'
import config from '../config'

const credentials = {
	accessKeyId: config.get('aws.accessKey'),
	secretAccessKey: config.get('aws.secretKey'),
}

const useLocal = !/staging|production/.test(config.get('env'))

const s3client = new AWS.S3({
	credentials,
	endpoint: useLocal ? 'http://localhost:4572' : undefined,
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
		const imageDir = config.get('aws.imageDirectory')
		s3client.upload(
			{
				Bucket: bucketName,
				/* include the bucket name here. For some reason Localstack needs it */
				Key: `${bucketName}/${imageDir}/${name}`,
				Body: data,
			},
			(err, response) => {
				if (err) throw err
				resolve(response)
			},
		)
	})