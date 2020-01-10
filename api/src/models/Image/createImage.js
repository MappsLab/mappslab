// @flow
import uuidv1 from 'uuid/v1'
import { upload } from 'Services/aws'
import { resizeImage, parseImage, streamToBuffer } from 'Utils/media'
import { createNode } from 'Database'
import type { ImageSize, ImageUpload, ImageType } from 'Types/ImageTypes'
import { validateNew } from './imageDBSchema'
import config from '../../config'

const defaultWidths = [100, 600, 1200]
const imageDirectory = config.get('aws.imageDirectory')

const parseAndUpload = async (
	source: Buffer,
	name: string,
	size?: number,
): Promise<ImageSize> => {
	const parsed = size
		? await resizeImage(source, size)
		: await parseImage(source)
	const { info, data } = parsed
	const fileName = `${imageDirectory}/${name}/w_${size || 'original'}.${
		info.format
	}`
	const uploaded = await upload(data, fileName)
	const { width, height, format } = info
	return {
		uri: uploaded.Key,
		width,
		height,
		format,
	}
}

export const createImage = async (
	source: ImageUpload,
	widths?: Array<number> = defaultWidths,
	imageName?: string,
): Promise<ImageType> => {
	const { createReadStream } = await source
	const buffer = await streamToBuffer(createReadStream())
	const name = imageName || uuidv1()
	const [original, sizes] = await Promise.all([
		parseAndUpload(buffer, name),
		Promise.all(widths.map((size) => parseAndUpload(buffer, name, size))),
	])
	const image = {
		original,
		sizes,
	}
	const validated = await validateNew(image)
	const newImage = await createNode(validated)
	return newImage
}
