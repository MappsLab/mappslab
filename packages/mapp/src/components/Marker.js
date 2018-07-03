// @flow
import * as React from 'react'
import { MapConsumer } from '../Mapp'

import type { LatLng, Map, Marker as MarkerType, MapContext } from '../types'
import { addListeners, removeListeners } from '../utils/listeners'

const markerEvents = {
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
	onZindexChanged: 'zindex_changed',
}

/**
 * Marker
 */

type BaseProps = {
	position: LatLng,
}

type MarkerProps = {
	position: LatLng,
	$gMap: Map,
}

class Marker extends React.Component<MarkerProps, State> {
	componentDidMount() {
		const { position, $gMap: map } = this.props
		this.entity = new window.google.maps.Marker({
			position,
			map,
		})
		if (this.entity) this.listeners = addListeners(this.entity, markerEvents, this.props)
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		removeListeners(this.listeners)
		this.entity = null
	}

	entity: null | MarkerType = null
	listeners: Array<Object> = []

	render() {
		return null
	}
}

const MarkerWithContext = (props: BaseProps): React.Node => (
	<MapConsumer>{(mapContext: MapContext) => <Marker {...props} {...mapContext} />}</MapConsumer>
)

export default MarkerWithContext
