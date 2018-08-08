// @flow
import * as React from 'react'
import { MapConsumer } from '../Mapp'
import { addListeners, removeListeners } from '../utils/listeners'
import { getNewValues, separateOptionsAndEvents } from '../utils/data'
import type { Marker as MarkerType, MarkerOptions } from '../types'
import type { MapContextType as MapContext } from '../Mapp'

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
	// position: LatLng,
	events: {},
	render: ({ anchor: MarkerType }) => null | React.Node,
	options: MarkerOptions,
}

type MarkerProps = BaseProps & {
	// map: Map,
}

type State = {
	ready: boolean,
}

class Marker extends React.Component<MarkerProps, State> {
	entity: null | MarkerType = null

	listeners: Array<{}> = []

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
		const newProps = getNewValues(this.props, nextProps)
		if (newProps) {
			const { options, events } = this.props
			if (!this.entity) return
			if (options) this.entity.setOptions(options)
			if (events) this.listeners = addListeners(this.entity, markerEventNames, events)
		}
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		removeListeners(this.listeners)
		this.entity = null
	}

	render() {
		const { render } = this.props
		const { ready } = this.state
		return !ready || this.entity === null ? null : render({ anchor: this.entity })
	}
}

const MarkerWithContext = (props: BaseProps): React.Node => (
	<MapConsumer>
		{// $FlowFixMe
		(mapContext: MapContext) => <Marker map={mapContext.map} {...props} />}
	</MapConsumer>
)

export default MarkerWithContext
