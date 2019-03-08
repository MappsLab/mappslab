// @flow

import sharp from 'sharp'

export const resizeImage = async (img: Buffer, width: number, height?: number): Promise<any> => sharp(img).resize(width, height)
