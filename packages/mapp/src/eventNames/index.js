// @flow

export const polylineEvents = {
	onClick: 'click',
	onDblClick: 'dblclick',
	onDrag: 'drag',
	onDragEnd: 'dragend',
	onDragStart: 'dragstart',
	onMouseDown: 'mousedown',
	onMouseOut: 'mouseout',
	onMouseOver: 'mouseover',
	onMouseUp: 'mouseup',
	onMouseMove: 'mousemove',
	onRightClick: 'rightclick',
}

export const polylineEventNames: Array<string> = Object.keys(polylineEvents)

export const mappedMapEventNames = {
	onBoundsChanged: 'bounds_changed',
	onCenterChanged: 'center_changed',
	onClick: 'click',
	onDblClick: 'dblclick',
	onDrag: 'drag',
	onDragEnd: 'dragend',
	onDragStart: 'dragstart',
	onHeadingChanged: 'heading_changed',
	onIdle: 'idle',
	onMapTypeIdChanged: 'maptypeid_changed',
	onMouseMove: 'mousemove',
	onMouseOut: 'mouseout',
	onMouseOver: 'mouseover',
	onProjectionChanged: 'projection_changed',
	onResize: 'resize',
	onRightClick: 'rightclick',
	onTilesLoaded: 'tilesloaded',
	onTiltChanged: 'tilt_changed',
	onZoomChanged: 'zoom_changed',
}

export const mapEventNames: Array<string> = Object.keys(mappedMapEventNames)

export const markerEvents = {
	onAnimationChanged: 'animation_changed',
	onClick: 'click',
	onClickableChanged: 'clickable_changed',
	onCursorChanged: 'cursor_changed',
	onDblClick: 'dblclick',
	onDrag: 'drag',
	onDragEnd: 'dragend',
	onDraggableChanged: 'draggable_changed',
	onDragStart: 'dragstart',
	onFlatChanged: 'flat_changed',
	onIconChanged: 'icon_changed',
	onMouseDown: 'mousedown',
	onMouseOut: 'mouseout',
	onMouseOver: 'mouseover',
	onMouseUp: 'mouseup',
	onPositionChanged: 'position_changed',
	onRightClick: 'rightclick',
	onShapeChanged: 'shape_changed',
	onTitleChanged: 'title_changed',
	onVisibleChanged: 'visible_changed',
	onZIndexChanged: 'zindex_changed',
}

export const markerEventNames: Array<string> = Object.keys(markerEvents)
