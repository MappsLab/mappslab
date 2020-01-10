// @flow
/* eslint-disable no-use-before-define */

import type { MVCObject, MVCArray } from './coreTypes'
import type {
	LatLng,
	LatLngLiteral,
	LatLngBounds,
	LatLngBoundsLiteral,
	Point,
} from './latLngTypes'
import type { Projection } from './projectionTypes'
import type {
	StreetViewPanorama,
	Size,
	FullscreenControlOptions,
	ControlPosition,
	ZoomControlOptions,
} from './viewTypes'
import type { Data } from './dataTypes'

/**
 * Map Types
 */

type RemoveDataLayer = () => void

export type Map = MVCObject & {
	constructor(mapDiv: Element | null, opts?: MapOptions): void,
	fitBounds(
		bounds: LatLngBounds | LatLngBoundsLiteral,
		padding?: number | Padding,
	): void,
	getBounds(): LatLngBounds | null | void,
	getCenter(): LatLng,
	getDiv(): Element,
	getHeading(): number,
	getMapTypeId(): MapTypeId | string,
	getProjection(): Projection,
	getStreetView(): StreetViewPanorama,
	getTilt(): number,
	getZoom(): number,
	panBy(x: number, y: number): void,
	panTo(latLng: LatLng | LatLngLiteral): void,
	panToBounds(
		latLngBounds: LatLngBounds | LatLngBoundsLiteral,
		padding?: number | Padding,
	): void,
	setCenter(latlng: LatLng | LatLngLiteral): void,
	setHeading(heading: number): void,
	setMapTypeId(mapTypeId: MapTypeId | string): void,
	setOptions(options: MapOptions): void,
	setStreetView(panorama: StreetViewPanorama): void,
	setTilt(tilt: number): void,
	setZoom(zoom: number): void,
	applyDataLayer(src: string): RemoveDataLayer,
	// This causes a PropType error, controls[0] is undefined
	// controls: MVCArray<Node>[],
	data: Data,
	mapTypes: MapTypeRegistry,
	overlayMapTypes: MVCArray<MapType>,
	setClickableIcons(clickable: boolean): void,
}

export interface MapType {
	getTile(tileCoord: Point, zoom: number, ownerDocument: Document): Element;
	releaseTile(tile: Element): void;
	alt?: string;
	maxZoom?: number;
	minZoom?: number;
	name?: string;
	projection?: Projection;
	radius?: number;
	tileSize?: Size;
}

export type MapTypeRegistry = MVCObject & {
	constructor(): void,
	set(id: string, mapType: MapType): void,
}

export type MapsEventListener = {
	/** Removes the listener.  Equivalent to calling google.maps.event.removeListener(listener). */
	remove(): void,
}

export type NamedEventListeners = {
	[key: string]: MapsEventListener,
}

export type MapTypeId =
	/** This map type displays a transparent layer of major streets on satellite images. */
	| 'HYBRID'
	/** This map type displays a normal street map. */
	| 'ROADMAP'
	/** This map type displays satellite images. */
	| 'SATELLITE'
	/** This map type displays maps with physical features such as terrain and vegetation. */
	| 'TERRAIN'

export type MapOptions = {
	/**
	 * Color used for the background of the Map div. This color will be visible when
	 * tiles have not yet loaded as the user pans. This option can only be set when
	the map is initialized.
	*/
	backgroundColor?: string,

	/**
	 * The initial Map center. Required.
	 */
	center?: LatLng | LatLngLiteral,

	/**
	 * When false, map icons are not clickable. A map icon represents a point of
	 * interest, also known as a POI. By default map icons are clickable.
	 */
	clickableIcons?: boolean,

	/**
	 * Enables/disables all default UI. May be overridden individually.
	 */
	disableDefaultUI?: boolean,

	/**
	 * Enables/disables zoom and center on double click. Enabled by default.
	 */
	disableDoubleClickZoom?: boolean,

	/**
	 * If false, prevents the map from being dragged. Dragging is enabled by default.
	 */
	draggable?: boolean,

	/**
		  * The name or url of the cursor to display when mousing over a draggable map.
		  * This property uses the css cursor attribute to change the icon. As with the
		 css property, you must specify at least one fallback cursor that is not a URL.
		 For example: draggableCursor: 'url(http://www.example.com/icon.png), auto;'.
		 */
	draggableCursor?: string,

	/**
		  * The name or url of the cursor to display when the map is being dragged. This
		  * property uses the css cursor attribute to change the icon. As with the css
		 property, you must specify at least one fallback cursor that is not a URL.
		 For example: draggingCursor: 'url(http://www.example.com/icon.png), auto;'.
		 */
	draggingCursor?: string,

	/**
	 * The enabled/disabled state of the Fullscreen control.
	 */
	fullscreenControl?: boolean,

	/**
	 * The display options for the Fullscreen control.
	 */
	fullscreenControlOptions?: FullscreenControlOptions,

	/**
	 * This setting controls how gestures on the map are handled.
	 */
	gestureHandling?: GestureHandlingOptions,

	/**
		  * The heading for aerial imagery in degrees measured clockwise from cardinal
		  * direction North. Headings are snapped to the nearest available angle for
		 which imagery is available.
		 */
	heading?: number,

	/**
	 * If false, prevents the map from being controlled by the keyboard. Keyboard
	 * shortcuts are enabled by default.
	 */
	keyboardShortcuts?: boolean,

	/**
	 * The initial enabled/disabled state of the Map type control.
	 */
	mapTypeControl?: boolean,

	/**
	 * The initial display options for the Map type control.
	 */
	mapTypeControlOptions?: MapTypeControlOptions,

	/**
	 * The initial Map mapTypeId. Defaults to ROADMAP.
	 */
	mapTypeId?: MapTypeId,

	/**
		  * The maximum zoom level which will be displayed on the map. If omitted, or set
		  * to null, the maximum zoom from the current map type is used instead. Valid
		 values: Integers between zero, and up to the supported maximum zoom level.
		 */
	maxZoom?: number,

	/**
		  * The minimum zoom level which will be displayed on the map. If omitted, or set
		  * to null, the minimum zoom from the current map type is used instead. Valid
		 values: Integers between zero, and up to the supported maximum zoom level.
		 */
	minZoom?: number,

	/**
	 * If true, do not clear the contents of the Map div.
	 */
	noClear?: boolean,
	overviewMapControl?: boolean,
	overviewMapControlOptions?: OverviewMapControlOptions,

	/**
		  * The enabled/disabled state of the Pan control.
		  * Note: The Pan control is not available in the new set of controls introduced
		 in v3.22 of the Google Maps JavaScript API. While using v3.22 and v3.23, you
		 can choose to use the earlier set of controls rather than the new controls,
		 thus making the Pan control available as part of the old control set.
		 See {@link https://developers.google.com/maps/articles/v322-controls-diff|What's New in the v3.22 Map Controls}.
		 */
	panControl?: boolean,

	/**
		  * The display options for the Pan control.
		  * Note: The Pan control is not available in the new set of controls introduced
		 in v3.22 of the Google Maps JavaScript API. While using v3.22 and v3.23, you
		 can choose to use the earlier set of controls rather than the new controls,
		 thus making the Pan control available as part of the old control set.
		 See {@link https://developers.google.com/maps/articles/v322-controls-diff|What's New in the v3.22 Map Controls}.
		 */
	panControlOptions?: PanControlOptions,

	/**
	 * The enabled/disabled state of the Rotate control.
	 */
	rotateControl?: boolean,

	/**
	 * The display options for the Rotate control.
	 */
	rotateControlOptions?: RotateControlOptions,

	/**
	 * The initial enabled/disabled state of the Scale control.
	 */
	scaleControl?: boolean,

	/**
	 * The initial display options for the Scale control.
	 */
	scaleControlOptions?: ScaleControlOptions,

	/**
	 * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
	 */
	scrollwheel?: boolean,

	/**
		  * The enabled/disabled state of the sign in control. This option only applies if
		  * signed_in=true has been passed as a URL parameter in the bootstrap request.
		 You may want to use this option to hide the map's sign in control if you have
		 provided another way for your users to sign in, such as the Google Sign-In
		 button. This option does not affect the visibility of the Google avatar shown
		 when the user is already signed in.
		 */
	signInControl?: boolean,

	/**
		  * A StreetViewPanorama to display when the Street View pegman is dropped on the
		  * map. If no panorama is specified, a default StreetViewPanorama will be
		 displayed in the map's div when the pegman is dropped.
		 */
	streetView?: StreetViewPanorama,

	/**
		  * The initial enabled/disabled state of the Street View Pegman control. This
		  * control is part of the default UI, and should be set to false when displaying
		 a map type on which the Street View road overlay should not appear
		 (e.g. a non-Earth map type).
		 */
	streetViewControl?: boolean,

	/**
	 * The initial display options for the Street View Pegman control.
	 */
	streetViewControlOptions?: StreetViewControlOptions,

	/**
		  * Styles to apply to each of the default map types. Note that for
		  * satellite/hybrid and terrain modes, these styles will only apply to labels
		 and geometry.
		 */
	styles?: MapTypeStyle[],

	/**
		  * Controls the automatic switching behavior for the angle of incidence of the
		  * map. The only allowed values are 0 and 45. The value 0 causes the map to
		 always use a 0° overhead view regardless of the zoom level and viewport. The
		 value 45 causes the tilt angle to automatically switch to 45 whenever 45°
		 imagery is available for the current zoom level and viewport, and switch back
		 to 0 whenever 45° imagery is not available (this is the default behavior).
		 45° imagery is only available for satellite and hybrid map types, within some
		 locations, and at some zoom levels. Note: getTilt returns the current tilt
		 angle, not the value specified by this option. Because getTilt and this option
		 refer to different things, do not bind() the tilt property; doing so may yield
		 unpredictable effects.
		 */
	tilt?: number,

	/**
	 * The initial Map zoom level. Required. Valid values: Integers between zero, and
	 * up to the supported maximum zoom level.
	 */
	zoom?: number,

	/**
	 * The enabled/disabled state of the Zoom control.
	 */
	zoomControl?: boolean,

	/**
	 * The display options for the Zoom control.
	 */
	zoomControlOptions?: ZoomControlOptions,
}

export interface MapTypeStyle {
	elementType?: MapTypeStyleElementType;
	featureType?: MapTypeStyleFeatureType;
	stylers?: MapTypeStyler[];
}

export interface StreetViewControlOptions {
	/**
	 * Position id. Used to specify the position of the control on the map. The
	 * default position is embedded within the navigation (zoom and pan) controls.
	 * If this position is empty or the same as that specified in the
	 * zoomControlOptions or panControlOptions, the Street View control will be
	 * displayed as part of the navigation controls. Otherwise, it will be displayed
	 * separately.
	 */
	position?: ControlPosition;
}

export interface OverviewMapControlOptions {
	opened?: boolean;
}

/** Options for the rendering of the pan control. */
export interface PanControlOptions {
	/**
	 * Position id. Used to specify the position of the control on the map.
	 * The default position is TOP_LEFT.
	 */
	position?: ControlPosition;
}

/** Options for the rendering of the rotate control. */
export interface RotateControlOptions {
	/**
	 * Position id. Used to specify the position of the control on the map.
	 * The default position is TOP_LEFT.
	 */
	position?: ControlPosition;
}

/** Options for the rendering of the scale control. */
export interface ScaleControlOptions {
	/** Style id. Used to select what style of scale control to display. */
	style?: ScaleControlStyle;
}

type ScaleControlStyle = 'DEFAULT'

export type MapTypeStyleFeatureType =
	| 'all'
	| 'administrative'
	| 'administrative.country'
	| 'administrative.land_parcel'
	| 'administrative.locality'
	| 'administrative.neighborhood'
	| 'administrative.province'
	| 'landscape'
	| 'landscape.man_made'
	| 'landscape.natural'
	| 'landscape.natural.landcover'
	| 'landscape.natural.terrain'
	| 'poi'
	| 'poi.attraction'
	| 'poi.business'
	| 'poi.government'
	| 'poi.medical'
	| 'poi.park'
	| 'poi.place_of_worship'
	| 'poi.school'
	| 'poi.sports_complex'
	| 'road'
	| 'road.arterial'
	| 'road.highway'
	| 'road.highway.controlled_access'
	| 'road.local'
	| 'transit'
	| 'transit.line'
	| 'transit.station'
	| 'transit.station.airport'
	| 'transit.station.bus'
	| 'transit.station.rail'
	| 'water'

export type MapTypeStyleElementType =
	| 'all'
	| 'geometry'
	| 'geometry.fill'
	| 'geometry.stroke'
	| 'labels'
	| 'labels.icon'
	| 'labels.text'
	| 'labels.text.fill'
	| 'labels.text.stroke'

export interface MapTypeStyler {
	color?: string;
	gamma?: number;
	hue?: string;
	invert_lightness?: boolean;
	lightness?: number;
	saturation?: number;
	visibility?: string;
	weight?: number;
}

export type GestureHandlingOptions = 'cooperative' | 'greedy' | 'none' | 'auto'

export interface MapTypeControlOptions {
	/** IDs of map types to show in the control. */
	mapTypeIds?: (MapTypeId | string)[];
	/**
	 * Position id. Used to specify the position of the control on the map.
	 * The default position is TOP_RIGHT.
	 */
	position?: ControlPosition;
	/** Style id. Used to select what style of map type control to display. */
	style?: MapTypeControlStyle;
}

export type MapTypeControlStyle = 'DEFAULT' | 'DROPDOWN_MENU' | 'HORIZONTAL_BAR'

export type Padding = {
	bottom: number,
	left: number,
	right: number,
	top: number,
}
