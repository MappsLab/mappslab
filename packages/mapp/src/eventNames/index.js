// @flow

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

export const mapEventNames = Object.keys(mappedMapEventNames)
