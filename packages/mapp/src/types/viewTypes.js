// @flow
/* eslint-disable no-use-before-define */

import type { MVCObject, MVCArray } from './coreTypes'
import type { LatLng, LatLngLiteral } from './latLngTypes'
import type { Map } from './mapTypes'
/**
 * View Types
 */

export type StreetViewPanorama = MVCObject & {
	constructor(container: Element, opts?: StreetViewPanoramaOptions): void,
	controls: MVCArray<Node>[],
	getLinks(): StreetViewLink[],
	getLocation(): StreetViewLocation,
	getMotionTracking(): boolean,
	getPano(): string,
	getPhotographerPov(): StreetViewPov,
	getPosition(): LatLng,
	getPov(): StreetViewPov,
	getStatus(): StreetViewStatus,
	getVisible(): boolean,
	getZoom(): number,
	registerPanoProvider(
		provider: (input: string) => StreetViewPanoramaData,
	): void,
	setLinks(links: Array<StreetViewLink>): void,
	setMotionTracking(motionTracking: boolean): void,
	setOptions(options: StreetViewPanoramaOptions): void,
	setPano(pano: string): void,
	setPosition(latLng: LatLng | LatLngLiteral): void,
	setPov(pov: StreetViewPov): void,
	setVisible(flag: boolean): void,
	setZoom(zoom: number): void,
}

export type StreetViewStatus = 'OK' | 'UNKNOWN_ERROR' | 'ZERO_RESULTS'

export type FullscreenControlOptions = {
	/**
	 * Position id. Used to specify the position of the control on the map.
	 * The default position is RIGHT_TOP.
	 */
	position?: ControlPosition,
}

export type ControlPosition =
	/** Elements are positioned in the center of the bottom row. */
	| 'BOTTOM_CENTER'
	/**
	 * Elements are positioned in the bottom left and flow towards the middle.
	 * Elements are positioned to the right of the Google logo.
	 */
	| 'BOTTOM_LEFT'
	/**
	 * Elements are positioned in the bottom right and flow towards the middle.
	 * Elements are positioned to the left of the copyrights.
	 */
	| 'BOTTOM_RIGHT'
	/**
	 * Elements are positioned on the left, above bottom-left elements, and flow upwards.
	 */
	| 'LEFT_BOTTOM'
	/** Elements are positioned in the center of the left side. */
	| 'LEFT_CENTER'
	/**
	 * Elements are positioned on the left, below top-left elements, and flow downwards.
	 */
	| 'LEFT_TOP'
	/**
	 * Elements are positioned on the right, above bottom-right elements, and flow upwards.
	 */
	| 'RIGHT_BOTTOM'
	/** Elements are positioned in the center of the right side. */
	| 'RIGHT_CENTER'
	/** Elements are positioned on the right, below top-right elements, and flow downwards. */
	| 'RIGHT_TOP'
	/**    Elements are positioned in the center of the top row. */
	| 'TOP_CENTER'
	/** Elements are positioned in the top left and flow towards the middle. */
	| 'TOP_LEFT'
	/** Elements are positioned in the top right and flow towards the middle. */
	| 'TOP_RIGHT'

export type StreetViewPanoramaOptions = {
	addressControl?: boolean,
	addressControlOptions?: StreetViewAddressControlOptions,
	clickToGo?: boolean,
	disableDefaultUI?: boolean,
	disableDoubleClickZoom?: boolean,
	enableCloseButton?: boolean,
	fullscreenControl?: boolean,
	fullscreenControlOptions?: FullscreenControlOptions,
	imageDateControl?: boolean,
	linksControl?: boolean,
	motionTracking?: boolean,
	motionTrackingControl?: boolean,
	motionTrackingControlOptions?: MotionTrackingControlOptions,
	mode?: 'html4' | 'html5' | 'webgl',
	panControl?: boolean,
	panControlOptions?: PanControlOptions,
	pano?: string,
	panoProvider?: (input: string) => StreetViewPanoramaData,
	position?: LatLng | LatLngLiteral,
	pov?: StreetViewPov,
	scrollwheel?: boolean,
	visible?: boolean,
	zoom?: number,
	zoomControl?: boolean,
	zoomControlOptions?: ZoomControlOptions,
}

/**
 * Options for the rendering of the pan control.
 */
export interface PanControlOptions {
	/**
	 * Position id. Used to specify the position of the control on the map.
	 * The default position is TOP_LEFT.
	 */
	position?: ControlPosition;
}

/**
 * Options for the rendering of the zoom control.
 */
export interface ZoomControlOptions {
	/**
	 * Position id. Used to specify the position of the control on the map.
	 * The default position is TOP_LEFT.
	 */
	position?: ControlPosition;
	style?: ZoomControlStyle;
}

export type ZoomControlStyle = 'DEFAULT' | 'LARGE' | 'SMALL'

export interface MotionTrackingControlOptions {
	position?: ControlPosition;
}

export interface StreetViewAddressControlOptions {
	position?: ControlPosition;
}

export type StreetViewLink = {
	description?: string,
	heading?: number,
	pano?: string,
}
export type StreetViewPov = {
	heading?: number,
	pitch?: number,
}
export type StreetViewPanoramaData = {
	copyright?: string,
	imageDate?: string,
	links?: StreetViewLink[],
	location?: StreetViewLocation,
	tiles?: StreetViewTileData,
}
export type StreetViewLocation = {
	description?: string,
	latLng?: LatLng,
	pano?: string,
	shortDescription?: string,
}
export type StreetViewTileData = {
	getTileUrl(
		pano: string,
		tileZoom: number,
		tileX: number,
		tileY: number,
	): string,
	centerHeading?: number,
	tileSize?: Size,
	worldSize?: Size,
}
export type StreetViewLocationRequest = {
	location: LatLng | LatLngLiteral,
	preference?: StreetViewPreference,
	radius?: number,
	source?: StreetViewSource,
}

export type StreetViewPreference = 'BEST' | 'NEAREST'

export type StreetViewSource = 'DEFAULT' | 'OUTDOOR'

export type Size = {
	constructor(
		width: number,
		height: number,
		widthUnit?: string,
		heightUnit?: string,
	): void,
	height: number,
	width: number,
	equals(other: Size): boolean,
	toString(): string,
}

export type StreetViewPanoRequest = {
	pano: string,
}
export type StreetViewService = {
	getPanorama(
		request: StreetViewLocationRequest | StreetViewPanoRequest,
		cb: (data: StreetViewPanoramaData, status: StreetViewStatus) => void,
	): void,
	getPanoramaById(
		pano: string,
		callback: (
			streetViewPanoramaData: StreetViewPanoramaData,
			streetViewStatus: StreetViewStatus,
		) => void,
	): void,
	getPanoramaByLocation(
		latlng: LatLng | LatLngLiteral,
		radius: number,
		callback: (
			streetViewPanoramaData: StreetViewPanoramaData,
			streetViewStatus: StreetViewStatus,
		) => void,
	): void,
}

export type StreetViewCoverageLayer = MVCObject & {
	getMap(): Map,
	setMap(map: Map | null): void,
}

export interface Attribution {
	iosDeepLinkId?: string;
	source?: string;
	webUrl?: string;
}
export interface Place {
	location?: LatLng | LatLngLiteral;
	placeId?: string;
	query?: string;
}

export type SaveWidget = {
	constructor(container: Node, opts?: SaveWidgetOptions): void,
	getAttribution(): Attribution,
	getPlace(): Place,
	setAttribution(attribution: Attribution): void,
	setOptions(opts: SaveWidgetOptions): void,
	setPlace(place: Place): void,
}
export interface SaveWidgetOptions {
	attribution?: Attribution;
	place?: Place;
}
