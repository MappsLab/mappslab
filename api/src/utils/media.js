// @flow
import sharp from 'sharp'
import toArray from 'stream-to-array'
// import type { ReadStream } from 'fs'

type ParsedImage = {
	data: Buffer,
	info: {
		width: number,
		height: number,
		format: string,
	},
}

export const parseImage = async (source: Buffer): Promise<ParsedImage> => sharp(source).toBuffer({ resolveWithObject: true })

export const resizeImage = async (source: Buffer, width: number, height?: number): Promise<ParsedImage> =>
	sharp(source)
		.resize(width, height)
		.toBuffer({ resolveWithObject: true })

export const streamToBuffer = async (stream: ReadableStream): Promise<Buffer> =>
	new Promise(async (resolve) => {
		toArray(stream).then((parts) => {
			const buffers = parts.map((part) => (Buffer.isBuffer(part) ? part : Buffer.from(part)))
			resolve(Buffer.concat(buffers))
		})
	})
