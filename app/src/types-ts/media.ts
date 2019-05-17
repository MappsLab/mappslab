export interface Tileset {
	uid: string
	baseUri: string
	maxZoom: number
}

interface ImageSize {
	format: string
	width: number
	height: number
	uri: string
}

export interface Image {
	uid: string
	original: ImageSize
	sizes: ImageSize[]
	tileset?: Tileset
}

export type Video = string
// export type VideoType = {
// 	url: string,
// 	provider: string,
// }
