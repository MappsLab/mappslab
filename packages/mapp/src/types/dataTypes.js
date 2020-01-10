// @flow
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import type { MVCObject } from './coreTypes'
import type { LatLng, LatLngLiteral } from './latLngTypes'
import type { Map } from './mapTypes'
import type { ControlPosition } from './viewTypes'
import type { MarkerShape, Icon } from './overlayTypes'

/**
 * Map Types
 */

export type Data = MVCObject & {
	constructor(options?: DataOptions): void,
	add(feature: Data$Feature | Data$FeatureOptions): Data$Feature,
	addGeoJson(geoJson: Object, options?: Data$GeoJsonOptions): Data$Feature[],
	contains(feature: Data$Feature): boolean,
	forEach(callback: (feature: Data$Feature) => void): void,
	getControlPosition(): ControlPosition,
	getControls(): DrawingMode[],
	getDrawingMode(): DrawingMode | null,
	getFeatureById(id: number | string): Data$Feature,
	getMap(): Map,
	getStyle(): Data$StylingFunction | Data$StyleOptions,
	loadGeoJson(
		url: string,
		options?: Data$GeoJsonOptions,
		callback?: (features: Data$Feature[]) => void,
	): void,
	overrideStyle(feature: Data$Feature, style: Data$StyleOptions): void,
	remove(feature: Data$Feature): void,
	revertStyle(feature?: Data$Feature): void,
	setControlPosition(controlPosition: ControlPosition): void,
	setControls(controls: DrawingMode[] | null): void,
	setDrawingMode(drawingMode: DrawingMode | null): void,
	setMap(map: Map | null): void,
	setStyle(style: Data$StylingFunction | Data$StyleOptions): void,
	toGeoJson(callback: (feature: Object) => void): void,
}

type DrawingMode = 'Point' | 'LineString' | 'Polygon'

interface DataOptions {
	controlPosition?: ControlPosition;
	controls?: DrawingMode[] | null;
	drawingMode?: DrawingMode | null;
	featureFactory?: (geometry: Data$Geometry) => Data$Feature;
	map?: Map;
	style?: Data$StylingFunction | Data$StyleOptions;
}

interface Data$GeoJsonOptions {
	idPropertyName?: string;
}
interface Data$StyleOptions {
	clickable?: boolean;
	cursor?: string;
	draggable?: boolean;
	editable?: boolean;
	fillColor?: string;
	fillOpacity?: number;
	icon?: string | Icon | Symbol;
	shape?: MarkerShape;
	strokeColor?: string;
	strokeOpacity?: number;
	strokeWeight?: number;
	title?: string;
	visible?: boolean;
	zIndex?: number;
}

type Data$StylingFunction = (feature: Data$Feature) => Data$StyleOptions
type Data$Feature = {
	constructor(options?: Data$FeatureOptions): void,
	forEachProperty(callback: (value: any, name: string) => void): void,
	getGeometry(): Data$Geometry,
	getId(): number | string,
	getProperty(name: string): any,
	removeProperty(name: string): void,
	setGeometry(newGeometry: Data$Geometry | LatLng | LatLngLiteral): void,
	setProperty(name: string, newValue: any): void,
	toGeoJson(callback: (feature: Object) => void): void,
}
interface Data$FeatureOptions {
	geometry?: Data$Geometry | LatLng | LatLngLiteral;
	id?: number | string;
	properties?: Object;
}
type Data$Geometry = {
	getType(): string,
	forEachLatLng(callback: (latLng: LatLng) => void): void,
}

type Data$Point = Data$Geometry & {
	constructor(latLng: LatLng | LatLngLiteral): void,
	get(): LatLng,
}
type Data$MultiPoint = Data$Geometry & {
	constructor(elements: (LatLng | LatLngLiteral)[]): void,
	getArray(): LatLng[],
	getAt(n: number): LatLng,
	getLength(): number,
}
type Data$LineString = Data$Geometry & {
	constructor(elements: (LatLng | LatLngLiteral)[]): void,
	getArray(): LatLng[],
	getAt(n: number): LatLng,
	getLength(): number,
}
type Data$MultiLineString = Data$Geometry & {
	constructor(elements: (Data$LineString | (LatLng | LatLngLiteral)[])[]): void,
	getArray(): Data$LineString[],
	getAt(n: number): Data$LineString,
	getLength(): number,
}
type Data$LinearRing = Data$Geometry & {
	constructor(elements: (LatLng | LatLngLiteral)[]): void,
	getArray(): LatLng[],
	getAt(n: number): LatLng,
	getLength(): number,
}
type Data$Polygon = Data$Geometry & {
	constructor(elements: (Data$LinearRing | (LatLng | LatLngLiteral)[])[]): void,
	getArray(): Data$LinearRing[],
	getAt(n: number): Data$LinearRing,
	getLength(): number,
}
type Data$MultiPolygon = Data$Geometry & {
	constructor(
		elements: (
			| Data$Polygon
			| (Data$LinearRing | (LatLng | LatLngLiteral)[])[]
		)[],
	): void,
	getArray(): Data$Polygon[],
	getAt(n: number): Data$Polygon,
	getLength(): number,
}
type Data$GeometryCollection = Data$Geometry & {
	constructor(elements: (Data$Geometry[] | LatLng[] | LatLngLiteral)[]): void,
	getArray(): Data$Geometry[],
	getAt(n: number): Data$Geometry,
	getLength(): number,
}
type Data$MouseEvent = {
	feature: Data$Feature,

	/**
	 * Prevents this event from propagating further.
	 */
	stop(): void,

	/**
	 * The latitude/longitude that was below the cursor when the event occurred.
	 */
	latLng: LatLng,
}
interface Data$AddFeatureEvent {
	feature: Data$Feature;
}
interface Data$RemoveFeatureEvent {
	feature: Data$Feature;
}
interface Data$SetGeometryEvent {
	feature: Data$Feature;
	newGeometry: Data$Geometry;
	oldGeometry: Data$Geometry;
}
interface Data$SetPropertyEvent {
	feature: Data$Feature;
	name: string;
	newValue: any;
	oldValue: any;
}
interface Data$RemovePropertyEvent {
	feature: Data$Feature;
	name: string;
	oldValue: any;
}
