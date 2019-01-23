// @flow
import * as React from 'react'
import type { Polyline as PolylineType, PolylineOptions } from '../types/overlayTypes'
import type { Map } from '../types/mapTypes'
import { getNewValues } from '../utils/data'
import { addListeners, removeListeners } from '../utils/listeners'
import { polylineEvents } from '../eventNames'
import { MappConsumer } from '../Mapp'

/**
 * PolyLine
 */

type RouteProps = {
	// ...
	render: ({ anchor: PolylineType }) => null | React.Node,
	events?: {},
	options: PolylineOptions,
	map: Map,
}

type State = {
	// ...
}

class PolyLine extends React.Component<RouteProps, State> {
	static defaultProps = {
		events: {},
	}

	constructor(props: RouteProps) {
		super(props)
		const { events, map, options } = this.props
		this.entity = new window.google.maps.Polyline({ map, ...options })
		this.listeners = addListeners(this.entity, polylineEvents, events)
	}

	componentWillReceiveProps(nextProps: RouteProps) {
		if (this.entity) this.entity.setOptions(nextProps.options)
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		removeListeners(this.listeners)
		this.entity = null
	}

	entity: null | PolylineType = null

	listeners: Array<{}> = []

	render() {
		const { render } = this.props
		if (this.entity === null || !render) return null
		return render({ anchor: this.entity })
	}
}

type BaseProps = {
	map: Map,
}

const PolyLineWithContext = (props: BaseProps): React.Node => (
	<MappConsumer>
		{// $FlowFixMe
		(mapContext: MapContext) => <PolyLine map={mapContext.map} {...props} />}
	</MappConsumer>
)

export default PolyLineWithContext
