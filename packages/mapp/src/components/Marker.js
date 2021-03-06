// @flow
import * as React from 'react'
import { MappConsumer } from '../Mapp'
import { addListeners, removeListeners } from '../utils/listeners'
import { markerEvents } from '../eventNames'
import type { Marker as MarkerType, MarkerOptions } from '../types/overlayTypes'
import type { Map, MapsEventListener } from '../types/mapTypes'
import type { MapContextType as MapContext } from '../Mapp'

/**
 * Marker
 */

type Handlers = {
	[key: string]: (...args: any[]) => void,
}

type MarkerProps = {
	render?: ({ anchor: MarkerType }) => null | React.Node,
	events?: Handlers,
	options: MarkerOptions,
	map: Map,
}

type State = {
	ready: boolean,
}

class Marker extends React.Component<MarkerProps, State> {
	static defaultProps = {
		events: {},
		render: () => null,
	}

	constructor(props: MarkerProps) {
		super(props)
		const { events, map, options } = props
		// const { options } = separateOptionsAndEvents(this.props, markerEventNames)
		this.entity = new window.google.maps.Marker({ map, ...options })
		this.listeners = events
			? addListeners(this.entity, markerEvents, events)
			: []
	}

	componentDidUpdate() {
		const { options } = this.props
		this.entity.setOptions(options)
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		removeListeners(this.listeners)
		this.entity = null
	}

	entity: null | MarkerType = null

	listeners: Array<MapsEventListener> = []

	render() {
		const { render } = this.props
		if (!this.entity || !render) return null
		return render({ anchor: this.entity })
	}
}

type BaseProps = {
	map: Map,
}

const MarkerWithContext = (props: BaseProps): React.Node => (
	<MappConsumer>
		{// $FlowFixMe
		(mapContext: MapContext) => <Marker map={mapContext.map} {...props} />}
	</MappConsumer>
)

export default MarkerWithContext
