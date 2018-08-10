// @flow
/* eslint-disable no-use-before-define */

import type { MVCObject, MVCArray } from './coreTypes'
import type { LatLng, LatLngLiteral, Point, LatLngBounds, LatLngBoundsLiteral } from './latLngTypes'
import type { Map } from './mapTypes'
import type { Size, StreetViewPanorama, Attribution, Place } from './viewTypes'

/**
 * Overlay Types
 */

/**
 * *** Overlays ****
 */
export type Marker = MVCObject & {
	// MAX_ZINDEX: number,
	constructor(opts?: MarkerOptions): void,
	getAnimation(): Animation,
	getAttribution(): Attribution,
	getClickable(): boolean,
	getCursor(): string,
	getDraggable(): boolean,
	getIcon(): string | Icon | Symbol,
	getLabel(): MarkerLabel,
	getMap(): Map | StreetViewPanorama,
	getOpacity(): number,
	getPlace(): Place,
	getPosition(): LatLng,
	getShape(): MarkerShape,
	getTitle(): string,
	getVisible(): boolean,
	getZIndex(): number,
	setAnimation(animation: Animation | null): void,
	setAttribution(attribution: Attribution): void,
	setClickable(flag: boolean): void,
	setCursor(cursor: string): void,
	setDraggable(flag: boolean): void,
	setIcon(icon: string | Icon | Symbol): void,
	setLabel(label: string | MarkerLabel): void,
	setMap(map: Map | StreetViewPanorama | null): void,
	setOpacity(opacity: number): void,
	setOptions(options: MarkerOptions): void,
	setPlace(place: Place): void,
	setPosition(latlng: LatLng | LatLngLiteral): void,
	setShape(shape: MarkerShape): void,
	setTitle(title: string): void,
	setVisible(visible: boolean): void,
	setZIndex(zIndex: number): void,
}

export interface MarkerOptions {
	/**
	 * The offset from the marker's position to the tip of an InfoWindow
	 * that has been opened with the marker as anchor.
	 */
	anchorPoint?: Point;

	/**
	 * Which animation to play when marker is added to a map.
	 */
	animation?: Animation;

	/**
	 * If true, the marker receives mouse and touch events.
	 * @default  true
	 */
	clickable?: boolean;

	/**
	 * Mouse cursor to show on hover.
	 */
	cursor?: string;

	/**
	 * If true, the marker can be dragged.
	 * @default  false
	 */
	draggable?: boolean;

	/**
	 * Icon for the foreground.
	 * If a string is provided, it is treated as though it were an Icon with the string as url.
	 * @type  undefined
	 */
	icon?: string | Icon | Symbol;

	/**
	 * Adds a label to the marker. The label can either be a string, or a MarkerLabel object.
	 * Only the first character of the string will be displayed.
	 * @type  undefined
	 */
	label?: string | MarkerLabel;

	/**
	 * Map on which to display Marker.
	 * @type  undefined
	 */
	map?: Map | StreetViewPanorama;

	/**
	 * The marker's opacity between 0.0 and 1.0.
	 */
	opacity?: number;

	/**
	 * Optimization renders many markers as a single static element.
	 * Optimized rendering is enabled by default.
	 Disable optimized rendering for animated GIFs or PNGs, or when each
	marker must be rendered as a separate DOM element (advanced usage
	only).
	*/
	optimized?: boolean;

	/**
	 * Place information, used to identify and describe the place
	 * associated with this Marker. In this context, 'place' means a
	 business, point of interest or geographic location. To allow a user
	to save this place, open an info window anchored on this marker.
	The info window will contain information about the place and an
	option for the user to save it. Only one of position or place can
	be specified.
	*/
	place?: Place;

	/**
	 * Marker position. Required.
	 */
	position: LatLng | LatLngLiteral;

	/**
	 * Image map region definition used for drag/click.
	 */
	shape?: MarkerShape;

	/**
	 * Rollover text.
	 */
	title?: string;

	/**
	 * If true, the marker is visible.
	 */
	visible?: boolean;

	/**
	 * All markers are displayed on the map in order of their zIndex,
	 * with higher values displaying in front of markers with lower values.
	 By default, markers are displayed according to their vertical position on screen,
	with lower markers appearing in front of markers further up the screen.
	*/
	zIndex?: number;
}

export interface Icon {
	/**
	 * The position at which to anchor an image in correspondence to the
	 * location of the marker on the map. By default, the anchor is
	located along the center point of the bottom of the image.
	*/
	anchor?: Point;

	/**
	 * The origin of the label relative to the top-left corner of the icon
	 * image, if a label is supplied by the marker. By default, the origin
	 is located in the center point of the image.
	*/
	labelOrigin?: Point;

	/**
	 * The position of the image within a sprite, if any. By default, the
	 * origin is located at the top left corner of the image (0, 0).
	 */
	origin?: Point;

	/**
	 * The size of the entire image after scaling, if any. Use this
	 * property to stretch/ shrink an image or a sprite.
	 */
	scaledSize?: Size;

	/**
	 * The display size of the sprite or image. When using sprites, you
	 * must specify the sprite size. If the size is not provided, it will
	 be set when the image loads.
	*/
	size?: Size;

	/**
	 * The URL of the image or sprite sheet.
	 */
	url?: string;
}

export interface MarkerLabel {
	/**
	 * The color of the label text. Default color is black.
	 */
	color?: string;

	/**
	 * The font family of the label text (equivalent to the CSS font-family property).
	 */
	fontFamily?: string;

	/**
	 * The font size of the label text (equivalent to the CSS font-size property). Default size is 14px.
	 */
	fontSize?: string;

	/**
	 * The font weight of the label text (equivalent to the CSS font-weight property).
	 */
	fontWeight?: string;

	/**
	 * The text to be displayed in the label. Only the first character of this string will be shown.
	 */
	text?: string;
}

export interface MarkerShape {
	coords?: number[];
	type?: string;
}

interface Symbol {
	/**
	 * The position of the symbol relative to the marker or polyline.
	 * The coordinates of the symbol's path are translated left and up by the anchor's x and y coordinates respectively.
	By default, a symbol is anchored at (0, 0).
	The position is expressed in the same coordinate system as the symbol's path.
	*/
	anchor?: Point;

	/**
	 * The symbol's fill color.
	 * All CSS3 colors are supported except for extended named colors. For symbol markers, this defaults to 'black'.
	 For symbols on polylines, this defaults to the stroke color of the corresponding polyline.
	*/
	fillColor?: string;

	/**
	 * The symbol's fill opacity.
	 * @default  0
	 */
	fillOpacity?: number;

	/**
	 * The symbol's path, which is a built-in symbol path, or a custom path expressed using SVG path notation. Required.
	 * @type  undefined
	 */
	path?: SymbolPath | string;

	/**
	 * The angle by which to rotate the symbol, expressed clockwise in degrees.
	 * Defaults to 0.
	 A symbol in an IconSequence where fixedRotation is false is rotated relative to the angle of the edge on which it lies.
	*/
	rotation?: number;

	/**
	 * The amount by which the symbol is scaled in size.
	 * For symbol markers, this defaults to 1; after scaling, the symbol may be of any size.
	 For symbols on a polyline, this defaults to the stroke weight of the polyline;
	after scaling, the symbol must lie inside a square 22 pixels in size centered at the symbol's anchor.
	*/
	scale?: number;

	/**
	 * The symbol's stroke color. All CSS3 colors are supported except for extended named colors.
	 * For symbol markers, this defaults to 'black'.
	 For symbols on a polyline, this defaults to the stroke color of the polyline.
	*/
	strokeColor?: string;

	/**
	 * The symbol's stroke opacity. For symbol markers, this defaults to 1.
	 * For symbols on a polyline, this defaults to the stroke opacity of the polyline.
	 */
	strokeOpacity?: number;

	/**
	 * The symbol's stroke weight. Defaults to the scale of the symbol.v
	 */
	strokeWeight?: number;
}

export type SymbolPath =
	/** A backward-pointing closed arrow. */
	| 'BACKWARD_CLOSED_ARROW'
	/** A backward-pointing open arrow. */
	| 'BACKWARD_OPEN_ARROW'
	/** A circle. */
	| 'CIRCLE'
	/** A forward-pointing closed arrow. */
	| 'FORWARD_CLOSED_ARROW'
	/** A forward-pointing open arrow. */
	| 'FORWARD_OPEN_ARROW'

export type Animation = 'BOUNCE' | 'DROP'

/**
 * An overlay that looks like a bubble and is often connected to a marker.
 * This class extends MVCObject.
 */
export type InfoWindow = MVCObject & {
	/**
	 * Creates an info window with the given options. An InfoWindow can be
	 * placed on a map at a particular position or above a marker,
	depending on what is specified in the options. Unless auto-pan is
	disabled, an InfoWindow will pan the map to make itself visible
	when it is opened. After constructing an InfoWindow, you must call
	open to display it on the map. The user can click the close button
	on the InfoWindow to remove it from the map, or the developer can
	call close() for the same effect.
	*/
	constructor(opts?: InfoWindowOptions): void,

	/**
	 * Closes this InfoWindow by removing it from the DOM structure.
	 */
	close(): void,
	getContent(): string | Element,
	getPosition(): LatLng,
	getZIndex(): number,

	/**
	 * Opens this InfoWindow on the given map. Optionally, an InfoWindow can be associated with an anchor.
	 * In the core API, the only anchor is the Marker class.
	However, an anchor can be any MVCObject that exposes a LatLng position property and optionally
	a Point anchorPoint property for calculating the pixelOffset (see InfoWindowOptions).
	The anchorPoint is the offset from the anchor's position to the tip of the InfoWindow.
	*/
	open(map?: Map | StreetViewPanorama, anchor?: MVCObject): void,
	setContent(content: string | Node): void,
	setOptions(options: InfoWindowOptions): void,
	setPosition(position: LatLng | LatLngLiteral): void,
	setZIndex(zIndex: number): void,
}

export interface InfoWindowOptions {
	/**
	 * Content to display in the InfoWindow. This can be an HTML element, a plain-text string, or a string containing HTML.
	 * The InfoWindow will be sized according to the content.
	To set an explicit size for the content, set content to be a HTML element with that size.
	* @type  undefined
	*/
	content?: string | Node;

	/**
	 * Disable auto-pan on open. By default, the info window will pan the map so that it is fully visible when it opens.
	 */
	disableAutoPan?: boolean;

	/**
	 * Maximum width of the infowindow, regardless of content's width.
	 * This value is only considered if it is set before a call to open.
	 To change the maximum width when changing content, call close, setOptions, and then open.
	*/
	maxWidth?: number;

	/**
	 * The offset, in pixels, of the tip of the info window from the point on the map
	 * at whose geographical coordinates the info window is anchored.
	 If an InfoWindow is opened with an anchor, the pixelOffset will be calculated from the anchor's anchorPoint property.
	*/
	pixelOffset?: Size;

	/**
	 * The LatLng at which to display this InfoWindow. If the InfoWindow is opened with an anchor, the anchor's position will be used instead.
	 */
	position?: LatLng | LatLngLiteral;

	/**
	 * All InfoWindows are displayed on the map in order of their zIndex,
	 * with higher values displaying in front of InfoWindows with lower values.
	 By default, InfoWindows are displayed according to their latitude,
	with InfoWindows of lower latitudes appearing in front of InfoWindows at higher latitudes.
	InfoWindows are always displayed in front of markers.
	*/
	zIndex?: number;
}

export type Polyline = MVCObject & {
	constructor(opts?: PolylineOptions): void,
	getDraggable(): boolean,
	getEditable(): boolean,
	getMap(): Map,
	getPath(): MVCArray<LatLng>,
	getVisible(): boolean,
	setDraggable(draggable: boolean): void,
	setEditable(editable: boolean): void,
	setMap(map: Map | null): void,
	setOptions(options: PolylineOptions): void,
	setPath(path: MVCArray<LatLng> | LatLng[] | LatLngLiteral[]): void,
	setVisible(visible: boolean): void,
}

export interface PolylineOptions {
	/**
	 * Indicates whether this Polyline handles mouse events. Defaults to true.
	 */
	clickable?: boolean;

	/**
	 * If set to true, the user can drag this shape over the map.
	 * The geodesic property defines the mode of dragging. Defaults to false.
	 */
	draggable?: boolean;

	/**
	 * If set to true, the user can edit this shape by dragging the control points shown at the vertices and on
	 * each segment. Defaults to false.
	 */
	editable?: boolean;

	/**
	 * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth.
	 * When false, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a
	 geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the
	surface of the earth. Defaults to false.
	*/
	geodesic?: boolean;

	/**
	 * The icons to be rendered along the polyline.
	 */
	icons?: IconSequence[];

	/**
	 * Map on which to display Polyline.
	 */
	map?: Map;

	/**
	 * The ordered sequence of coordinates of the Polyline.
	 * This path may be specified using either a simple array of LatLngs, or an MVCArray of LatLngs.
	 Note that if you pass a simple array, it will be converted to an MVCArray Inserting or removing LatLngs
	in the MVCArray will automatically update the polyline on the map.
	*/
	path?: MVCArray<LatLng> | LatLng[] | LatLngLiteral[];

	/**
	 * The stroke color. All CSS3 colors are supported except for extended named colors.
	 */
	strokeColor?: string;

	/**
	 * The stroke opacity between 0.0 and 1.0.
	 */
	strokeOpacity?: number;

	/**
	 * The stroke width in pixels.
	 */
	strokeWeight?: number;

	/**
	 * Whether this polyline is visible on the map. Defaults to true.
	 */
	visible?: boolean;

	/**
	 * The zIndex compared to other polys.
	 */
	zIndex?: number;
}

export interface IconSequence {
	fixedRotation?: boolean;
	icon?: Symbol;
	offset?: string;
	repeat?: string;
}

export type Polygon = MVCObject & {
	constructor(opts?: PolygonOptions): void,
	getDraggable(): boolean,
	getEditable(): boolean,
	getMap(): Map,

	/**
	 * Retrieves the first path.
	 */
	getPath(): MVCArray<LatLng>,

	/**
	 * Retrieves the paths for this polygon.
	 */
	getPaths(): MVCArray<MVCArray<LatLng>>,
	getVisible(): boolean,
	setDraggable(draggable: boolean): void,
	setEditable(editable: boolean): void,
	setMap(map: Map | null): void,
	setOptions(options: PolygonOptions): void,
	setPath(path: MVCArray<LatLng> | LatLng[] | LatLngLiteral[]): void,
	setPaths(
		paths: MVCArray<MVCArray<LatLng>> | MVCArray<LatLng> | LatLng[][] | LatLngLiteral[][] | LatLng[] | LatLngLiteral[],
	): void,
	setVisible(visible: boolean): void,
}

export interface PolygonOptions {
	/**
	 * Indicates whether this Polygon handles mouse events. Defaults to true.
	 */
	clickable?: boolean;

	/**
	 * If set to true, the user can drag this shape over the map.
	 * The geodesic property defines the mode of dragging. Defaults to false.
	 */
	draggable?: boolean;

	/**
	 * If set to true, the user can edit this shape by dragging the control points
	 * shown at the vertices and on each segment. Defaults to false.
	 */
	editable?: boolean;

	/**
	 * The fill color. All CSS3 colors are supported except for extended named colors.
	 */
	fillColor?: string;

	/**
	 * The fill opacity between 0.0 and 1.0
	 */
	fillOpacity?: number;

	/**
	 * When true, edges of the polygon are interpreted as geodesic and will follow
	 * the curvature of the Earth. When false, edges of the polygon are rendered as
	 straight lines in screen space. Note that the shape of a geodesic polygon may
	appear to change when dragged, as the dimensions are maintained relative to
	the surface of the earth. Defaults to false.
	*/
	geodesic?: boolean;

	/**
	 * Map on which to display Polygon.
	 */
	map?: Map;

	/**
	 * The ordered sequence of coordinates that designates a closed loop. Unlike
	 * polylines, a polygon may consist of one or more paths. As a result, the paths
	 property may specify one or more arrays of LatLng coordinates. Paths are
	closed automatically; do not repeat the first vertex of the path as the last
	vertex. Simple polygons may be defined using a single array of LatLngs. More
	complex polygons may specify an array of arrays. Any simple arrays are
	converted into MVCArrays. Inserting or removing LatLngs from the MVCArray
	will automatically update the polygon on the map.
	*/
	paths?: MVCArray<MVCArray<LatLng>> | MVCArray<LatLng> | LatLng[][] | LatLngLiteral[][] | LatLng[] | LatLngLiteral[];

	/**
	 * The stroke color.
	 * All CSS3 colors are supported except for extended named colors.
	 */
	strokeColor?: string;

	/**
	 * The stroke opacity between 0.0 and 1.0
	 */
	strokeOpacity?: number;

	/**
	 * The stroke position. Defaults to CENTER.
	 * This property is not supported on Internet Explorer 8 and earlier.
	 */
	strokePosition?: StrokePosition;

	/**
	 * The stroke width in pixels.
	 */
	strokeWeight?: number;

	/**
	 * Whether this polygon is visible on the map. Defaults to true.
	 */
	visible?: boolean;

	/**
	 * The zIndex compared to other polys.
	 */
	zIndex?: number;
}

type StrokePosition =
	/**
	 * The stroke is centered on the polygon's path, with half the stroke inside
	 * the polygon and half the stroke outside the polygon.
	 */
	| 'CENTER'
	/** The stroke lies inside the polygon. */
	| 'INSIDE'
	/** The stroke lies outside the polygon. */
	| 'OUTSIDE'

export type PolyMouseEvent = {
	edge?: number,
	path?: number,
	vertex?: number,
} & MouseEvent

export type Rectangle = MVCObject & {
	constructor(opts?: RectangleOptions): void,
	getBounds(): LatLngBounds,
	getDraggable(): boolean,
	getEditable(): boolean,
	getMap(): Map,
	getVisible(): boolean,
	setBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void,
	setDraggable(draggable: boolean): void,
	setEditable(editable: boolean): void,
	setMap(map: Map | null): void,
	setOptions(options: RectangleOptions): void,
	setVisible(visible: boolean): void,
}

export interface RectangleOptions {
	bounds?: LatLngBounds | LatLngBoundsLiteral;
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;
	fillColor?: string;
	fillOpacity?: number;
	map?: Map;
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: StrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;
}

/**
 * A circle on the Earth's surface; also known as a "spherical cap".
 */
export type Circle = MVCObject & {
	/**
	 * Create a circle using the passed CircleOptions, which specify the center, radius, and style.
	 */
	constructor(opts?: CircleOptions): void,

	/**
	 * Gets the LatLngBounds of this Circle.
	 */
	getBounds(): LatLngBounds,

	/**
	 * Returns the center of this circle.
	 */
	getCenter(): LatLng,

	/**
	 * Returns whether this circle can be dragged by the user.
	 */
	getDraggable(): boolean,

	/**
	 * Returns whether this circle can be edited by the user.
	 */
	getEditable(): boolean,

	/**
	 * Returns the map on which this circle is displayed.
	 */
	getMap(): Map,

	/**
	 * Returns the radius of this circle (in meters).
	 */
	getRadius(): number,

	/**
	 * Returns whether this circle is visible on the map.
	 */
	getVisible(): boolean,

	/**
	 * Sets the center of this circle.
	 */
	setCenter(center: LatLng | LatLngLiteral): void,

	/**
	 * If set to true, the user can drag this circle over the map.
	 */
	setDraggable(draggable: boolean): void,

	/**
	 * If set to true, the user can edit this circle by dragging the control points shown at the center and around
	 * the circumference of the circle.
	 */
	setEditable(editable: boolean): void,

	/**
	 * Renders the circle on the specified map. If map is set to null, the circle will be removed.
	 */
	setMap(map: Map | null): void,
	setOptions(options: CircleOptions): void,

	/**
	 * Sets the radius of this circle (in meters).
	 */
	setRadius(radius: number): void,

	/**
	 * Hides this circle if set to false.
	 */
	setVisible(visible: boolean): void,
}

export interface CircleOptions {
	/**
	 * The center
	 */
	center?: LatLng | LatLngLiteral;

	/**
	 * Indicates whether this Circle handles mouse events. Defaults to true.
	 */
	clickable?: boolean;

	/**
	 * If set to true, the user can drag this circle over the map. Defaults to false.
	 */
	draggable?: boolean;

	/**
	 * If set to true, the user can edit this circle by dragging the control points shown at the center and around
	 * the circumference of the circle. Defaults to false.
	 */
	editable?: boolean;

	/**
	 * The fill color. All CSS3 colors are supported except for extended named colors.
	 */
	fillColor?: string;

	/**
	 * The fill opacity between 0.0 and 1.0
	 */
	fillOpacity?: number;

	/**
	 * Map on which to display Circle.
	 */
	map?: Map;

	/**
	 * The radius in meters on the Earth's surface
	 */
	radius?: number;

	/**
	 * The stroke color. All CSS3 colors are supported except for extended named colors.
	 */
	strokeColor?: string;

	/**
	 * The stroke opacity between 0.0 and 1.0
	 */
	strokeOpacity?: number;

	/**
	 * The stroke position. Defaults to CENTER. This property is not supported on Internet Explorer 8 and earlier.
	 */
	strokePosition?: StrokePosition;

	/**
	 * The stroke width in pixels.
	 */
	strokeWeight?: number;

	/**
	 * Whether this circle is visible on the map. Defaults to true.
	 */
	visible?: boolean;

	/**
	 * The zIndex compared to other polys.
	 */
	zIndex?: number;
}

export type CircleLiteral = {
	/**
	 * The center of the Circle.
	 */
	center?: LatLng | LatLngLiteral,

	/**
	 * The radius in meters on the Earth's surface.
	 */
	radius?: number,
} & CircleOptions

export type GroundOverlay = MVCObject & {
	constructor(url: string, bounds: LatLngBounds | LatLngBoundsLiteral, opts?: GroundOverlayOptions): void,
	getBounds(): LatLngBounds,
	getMap(): Map,
	getOpacity(): number,
	getUrl(): string,
	setMap(map: Map | null): void,
	setOpacity(opacity: number): void,
}

export interface GroundOverlayOptions {
	clickable?: boolean;
	map?: Map;
	opacity?: number;
}

export type OverlayView = MVCObject & {
	draw(): void,
	getMap(): Map | StreetViewPanorama,
	getPanes(): MapPanes,
	getProjection(): MapCanvasProjection,
	onAdd(): void,
	onRemove(): void,
	setMap(map: Map | StreetViewPanorama | null): void,
}

export interface MapPanes {
	floatPane: Element;
	floatShadow: Element;
	mapPane: Element;
	markerLayer: Element;
	overlayImage: Element;
	overlayLayer: Element;
	overlayMouseTarget: Element;
	overlayShadow: Element;
}

export type MapCanvasProjection = MVCObject & {
	fromContainerPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng,
	fromDivPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng,
	fromLatLngToContainerPixel(latLng: LatLng): Point,
	fromLatLngToDivPixel(latLng: LatLng): Point,
	getWorldWidth(): number,
}
