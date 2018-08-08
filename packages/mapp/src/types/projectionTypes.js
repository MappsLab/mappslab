// @flow
/* eslint-disable no-use-before-define */

import type { MVCObject } from './coreTypes'
import type { Point, LatLng } from './latLngTypes'

/**
 * Projection Types
 */

export type Projection = {
	fromLatLngToPoint(latLng: LatLng, point?: Point): Point,
	fromPointToLatLng(pixel: Point, noWrap?: boolean): LatLng,
}

export type MapCanvasProjection = MVCObject & {
	fromContainerPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng,
	fromDivPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng,
	fromLatLngToContainerPixel(latLng: LatLng): Point,
	fromLatLngToDivPixel(latLng: LatLng): Point,
	getWorldWidth(): number,
}
