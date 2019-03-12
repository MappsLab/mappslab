// @flow

export type ImageSize = {
	uri: string,
	width: number,
	height: number,
	label?: string,
	format: string,
}

export type ImageType = {
	uid: string,
	name: string,
	sizes: Array<ImageSize>,
	original: ImageSize,
}
