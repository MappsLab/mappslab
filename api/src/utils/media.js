// @flow

import sharp from 'sharp'

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
