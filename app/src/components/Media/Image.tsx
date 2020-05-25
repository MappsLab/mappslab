import * as React from 'react'
import { Image as ImageType } from '../../types-ts'
import { getBestSize } from 'Utils/media'
import { config } from '../../config'

interface ImageProps {
	image: ImageType
	size: number
	alt?: string
}

const getSrc = (image: ImageType, size: number) =>
	`${config.imageBucketRoot}${getBestSize(image, size).uri}`

export const Image = ({ image, size, alt }: ImageProps) => (
	<img alt={alt || ''} src={getSrc(image, size)} />
)

Image.defaultProps = {
	alt: undefined,
}
