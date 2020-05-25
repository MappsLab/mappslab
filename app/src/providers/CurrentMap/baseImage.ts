import { Tileset, LatLngType } from '../../types-ts'
import { config } from '../../config'

interface XY {
	x: number
	y: number
}

const getNormalizedCoord = (coord: XY, zoom: number) => {
	let y = coord.y
	let x = coord.x

	// tile range in one direction range is dependent on zoom level
	// 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
	let tileRange = 1 << zoom

	// don't repeat across y-axis (vertically)
	if (y < 0 || y >= tileRange) {
		return null
	}

	// repeat across x-axis
	if (x < 0 || x >= tileRange) {
		x = ((x % tileRange) + tileRange) % tileRange
	}

	return { x, y }
}

const getTileUrl = (baseUri: string) => (coord: XY, zoom: number): string => {
	const normalized = getNormalizedCoord(coord, zoom)
	if (!normalized) return `${config.imageBucketRoot}/static/noTile.png`
	const { x, y } = normalized
	const url = `${config.imageBucketRoot}${baseUri}/${zoom}/${x}/${y}.png`
	return url
}

interface BaseImageOptions
	extends Omit<google.maps.ImageMapTypeOptions, 'getTileUrl' | 'tileSize'> {
	tileSize: number
}

const defaultBaseImageOptions: BaseImageOptions = {
	tileSize: 256,
	maxZoom: 9,
	minZoom: 0,
	name: 'Base Image',
}

export interface SetBaseImageArgs {
	map: google.maps.Map
	tileSet: Tileset | null
	options?: BaseImageOptions
}

export const applyBaseImage = (
	googleMap: google.maps.Map,
	tileset: Tileset | null,
) => {
	if (!tileset) {
		googleMap.setMapTypeId('roadmap')
		return
	}
	const options = defaultBaseImageOptions
	const { baseUri, maxZoom } = tileset
	const { tileSize, minZoom } = options
	const baseImage = new google.maps.ImageMapType({
		getTileUrl: getTileUrl(baseUri),
		tileSize: new google.maps.Size(tileSize, tileSize),
		maxZoom,
		minZoom,
		name,
	})

	googleMap.mapTypes.set('customImage', baseImage)
	googleMap.setMapTypeId('customImage')
}
