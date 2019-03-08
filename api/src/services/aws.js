// @flow
import { S3 } from 'aws-sdk'
import config from '../config'

const credentials = {
	accessKeyId: config.get('aws.accessKey'),
	secretAccessKey: config.get('aws.secretKey'),
}

const client = new S3({
	credentials,
})

type PutResponse = any

const put = async (data: Buffer, name: string): Promise<PutResponse> =>
	new Promise((resolve) => {
		client.putObject({
			Bucket: config.get('aws.bucketName'),
		})
	})

export const uploadImage = async (data: Buffer, name: string): Promise<null> => {
	s3.put
}
