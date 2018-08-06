// @flow
import * as React from 'react'
import { MapConsumer } from '../Mapp'
import { addListeners, removeListeners } from '../utils/listeners'
import { getNewValues, separateOptionsAndEvents } from '../utils/data'
import type { LatLng, Map, Marker as MarkerType, MapContext } from '../types'

const markerEventNames = {
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
	map: Map,
	render: ({ anchor: any }) => null | React.Node,
}

class Marker extends React.Component<MarkerProps, State> {
	static defaultProps = {
		render: () => null,
	}

	state = {
		ready: false,
	}

	componentDidMount() {
		const { events } = this.props
		const { options } = separateOptionsAndEvents(this.props, markerEventNames)
		this.entity = new window.google.maps.Marker(options)
		if (this.entity) this.listeners = addListeners(this.entity, markerEventNames, events)
		this.setState({ ready: true })
	}

	componentWillReceiveProps(nextProps) {
		if (this.entity === null) return
		const newProps = getNewValues(this.props, nextProps)
		if (newProps) {
			const { options, events } = separateOptionsAndEvents(newProps, markerEventNames)
			if (options) this.entity.setOptions(options)
			if (events) addListeners(this.entity, markerEventNames, events)
		}
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		removeListeners(this.listeners)
		this.entity = null
	}

	entity: null | MarkerType = null
	listeners: Array<Object> = []

	render() {
		return this.props.render({ anchor: this.entity }) || null
	}
}

const MarkerWithContext = (props: BaseProps): React.Node => (
	<MapConsumer>{(mapContext: MapContext) => <Marker {...mapContext} {...props} />}</MapConsumer>
)

export default MarkerWithContext
