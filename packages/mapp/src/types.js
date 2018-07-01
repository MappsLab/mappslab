// @flow
// Copied from https://github.com/jonboiser/flowtype-google-maps/blob/master/flow-typed/google-maps.js

export type LatLng = {
	lat: number,
	lng: number,
}

declare class MVCObject {
	addListener(event: string, handler: Function): any;
	get(key: string): any;
	notify(key: string): void;
	set(key: string, value: any): void;
	setValues(values?: Object): void;
	unbind(key: string): void;
	unbindAll(): void;
}

export type MapOptions = {
	backgroundColor?: string,
	center?: LatLng,
	disableDefaultUI?: boolean,
	clickableIcons?: boolean,
	disableDoubleClickZoom?: boolean,
	draggable?: boolean,
	draggableCursor?: string,
	draggingCursor?: string,
	heading?: number,
	keyboardShortcuts?: boolean,
	mapMaker?: boolean,
	mapTypeControl?: boolean,
	// mapTypeControlOptions?: MapTypeControlOptions;
	// mapTypeId?: MapTypeId;
	maxZoom?: number,
	minZoom?: number,
	noClear?: boolean,
	overviewMapControl?: boolean,
	// overviewMapControlOptions?: OverviewMapControlOptions;
	panControl?: boolean,
	// panControlOptions?: PanControlOptions;
	rotateControl?: boolean,
	// rotateControlOptions?: RotateControlOptions;
	scaleControl?: boolean,
	// scaleControlOptions?: ScaleControlOptions;
	scrollwheel?: boolean,
	// streetView?: StreetViewPanorama;
	streetViewControl?: boolean,
	// streetViewControlOptions?: StreetViewControlOptions;
	// styles?: MapTypeStyle[];
	tilt?: number,
	zoom?: number,
	zoomControl?: boolean,
	// zoomControlOptions?: ZoomControlOptions;
}

export type Map = MVCObject & {
	constructor(mapDiv: Element, opts?: Object): void,
	fitBounds(bounds: LatLng): void,
	getBounds(): LatLng,
	getCenter(): LatLng,
	getClickableIcons(): boolean,
	getDiv(): HTMLElement,
	getHeading(): number,
	getMapTypeId(): string,
	getProjection(): any,
	getStreetView(): any,
	getTilt(): number,
	getZoom(): number,
	panBy(x: number, y: number): void,
	panTo(latLng: LatLng): void,
	panToBounds(latLng: LatLng): void,
	setCenter(latLng: LatLng): void,
	setClickableIcons(value: boolean): void,
	setHeading(heading: number): void,
	setMapTypeId(mapTypeId: string): void,
	setOptions(options: LatLng): void,
	setStreetView(panorama: Object): void,
	setTilt(tilt: number): void,
	setZoom(zoom: number): void,
	controls: Array<any>,
	data: Object,
	mapTypes: any,
	overlayMapTypes: Array<any>,
}

type MapEntityBase = {
	setMap: (map: null | Map) => void,
	addListener: (eventName: string, handler: () => {}) => void,
}

export type Marker = MapEntityBase & {
	position: LatLng,
}

export type InfoWindow = MapEntityBase & {
	position: LatLng,
}

export type MapEntity = Marker | InfoWindow
