// @flow

import * as React from 'react'
import type { ImageType } from 'Types/Media'
import { getBestSize } from 'Utils/media'
import config from '../../config'

type Props = {
	image: ImageType,
	size: number,
	alt?: string,
}

const getSrc = (image, size) =>
	`${config.imageBucketRoot}${getBestSize(image, size).uri}`

const Image = ({ image, size, alt }: Props) => (
	<img alt={alt || ''} src={getSrc(image, size)} />
)

Image.defaultProps = {
	alt: undefined,
}

export default Image
