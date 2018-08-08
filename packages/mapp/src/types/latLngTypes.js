// @flow
/* eslint-disable no-use-before-define */

/**
 * Location / Point Types
 */
export type LatLngLiteral = {
	lat: number,
	lng: number,
}
export type LatLngBoundsLiteral = {
	east: number,
	north: number,
	south: number,
	west: number,
}

export type LatLng = {
	/**
	 * Creates a LatLng object representing a geographic point.
	 * Note the ordering of latitude and longitude.
	 * @param  Latitude is specified in degrees within the range [-90, 90].
	 * @param  Longitude is specified in degrees within the range [-180, 180].
	 * @param  Set noWrap to true to enable values outside of this range.
	 */
	// constructor(lat: number, lng: number, noWrap?: boolean): this,

	/**
	 * Comparison function.
	 */
	equals(other: LatLng): boolean,

	/**
	 * Returns the latitude in degrees.
	 */
	lat(): number,

	/**
	 * Returns the longitude in degrees.
	 */
	lng(): number,

	/**
	 * Converts to string representation.
	 */
	toString(): string,

	/**
	 * Returns a string of the form "lat,lng". We round the lat/lng values to 6 decimal places by default.
	 */
	toUrlValue(precision?: number): string,

	/**
	 * Converts to JSON representation. This function is intended to be used via JSON.stringify.
	 */
	toJSON(): LatLngLiteral,
}

/**
 * A LatLngBounds instance represents a rectangle in geographical coordinates, including one
 * that crosses the 180 degrees longitudinal meridian.
 */
export type LatLngBounds = {
	/**
	 * Constructs a rectangle from the points at its south-west and north-east corners.
	 */
	constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral): void,

	/**
	 * Returns true if the given lat/lng is in this bounds.
	 */
	contains(latLng: LatLng | LatLngLiteral): boolean,

	/**
	 * Returns true if this bounds approximately equals the given bounds.
	 */
	equals(other: LatLngBounds | LatLngBoundsLiteral): boolean,

	/**
	 * Extends this bounds to contain the given point.
	 */
	extend(point: LatLng | LatLngLiteral): LatLngBounds,

	/**
	 * Computes the center of this LatLngBounds
	 */
	getCenter(): LatLng,

	/**
	 * Returns the north-east corner of this bounds.
	 */
	getNorthEast(): LatLng,

	/**
	 * Returns the south-west corner of this bounds.
	 */
	getSouthWest(): LatLng,

	/**
	 * Returns true if this bounds shares any points with the other bounds.
	 */
	intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean,

	/**
	 * Returns if the bounds are empty.
	 */
	isEmpty(): boolean,

	/**
	 * Converts to JSON representation. This function is intended to be used via JSON.stringify.
	 */
	toJSON(): LatLngBoundsLiteral,

	/**
	 * Converts the given map bounds to a lat/lng span.
	 */
	toSpan(): LatLng,

	/**
	 * Converts to string.
	 */
	toString(): string,

	/**
	 * Returns a string of the form "lat_lo,lng_lo,lat_hi,lng_hi" for this bounds, where "lo" corresponds to the
	 * southwest corner of the bounding box, while "hi" corresponds to the northeast corner of that box.
	 */
	toUrlValue(precision?: number): string,

	/**
	 * Extends this bounds to contain the union of this and the given bounds.
	 */
	union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds,
}

export type Point = {
	/**
	 * A point on a two-dimensional plane.
	 */
	constructor(x: number, y: number): void,

	/**
	 * The X coordinate
	 */
	x: number,

	/**
	 * The Y coordinate
	 */
	y: number,

	/**
	 * Compares two Points
	 */
	equals(other: Point): boolean,

	/**
	 * Returns a string representation of this Point.
	 */
	toString(): string,
}
