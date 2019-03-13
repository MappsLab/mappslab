// @flow

type ImageSize = {
	format: string,
	width: number,
	height: number,
	uri: string,
}

export type ImageType = {
	uid: string,
	original: ImageSize,
	sizes: Array<ImageSize>,
}
