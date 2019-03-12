// @flow
import uuidv1 from 'uuid/v1'
import { upload } from 'Services/aws'
import { resizeImage, parseImage } from 'Utils/media'
import { createNode } from 'Database'
import type { ImageSize, ImageType } from 'Types/ImageTypes'
import { validateNew } from './imageDBSchema'

const defaultWidths = [100, 600, 1200]

const parseAndUpload = async (source: Buffer, name: string, size?: number): Promise<ImageSize> => {
	const parsed = size ? await resizeImage(source, size) : await parseImage(source)
	const { info, data } = parsed
	const fileName = `${name}/w_${size || 'original'}.${info.format}`
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
	source: Buffer,
	widths?: Array<number> = defaultWidths,
	imageName?: string,
): Promise<ImageType> => {
	const name = imageName || uuidv1()
	const [original, sizes] = await Promise.all([
		parseAndUpload(source, name),
		Promise.all(widths.map((size) => parseAndUpload(source, name, size))),
	])
	const image = {
		original,
		sizes,
	}
	const validated = await validateNew(image)
	const newImage = await createNode(validated)
	return newImage
}
