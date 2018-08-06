// @flow
import * as React from 'react'
import { addListeners, removeListeners } from '../utils/listeners'
import type { LatLng, Map, Marker, InfoWindow as InfoWindowType } from '../types'
import { getNewValues, separateOptionsAndEvents } from '../utils/data'
import { MapConsumer } from '../Mapp'
/**
 * InfoWindow
 */

const infoWindowEventNames = {
	onCloseClick: 'closeclick',
	onContentChanged: 'content_changed',
	onDOMReady: 'domready',
	onPositionChanged: 'position_changed',
	onZindexChanged: 'zindex_changed',
}

type Props = {
	position?: LatLng,
	anchor?: Marker,
	onCloseClick?: () => void,
	onDomReady?: () => void,
	onPositionChanged?: () => void,
	onZindexChanged?: () => void,
	map: Map,
}

type State = {
	// ...
}

class InfoWindow extends React.Component<Props, State> {
	static defaultProps = {
		position: null,
		anchor: null,
		onCloseClick: () => {},
		onDomReady: () => {},
		onPositionChanged: () => {},
		onZindexChanged: () => {},
	}

	constructor(props: Props) {
		super(props)
		if (!props.position && !props.anchor) throw new Error('InfoWindow must have either a `anchor` or `position` prop')
		if (props.position && props.anchor) throw new Error('InfoWindow must have either a `anchor` or `position` prop, not both')
	}

	componentDidMount() {
		const { map, anchor, ...props } = this.props
		const { options, events } = separateOptionsAndEvents(props, infoWindowEventNames)
		this.entity = new window.google.maps.InfoWindow(options)
		console.log(events)
		this.entity.open(map, anchor)
		if (this.entity) this.listeners = addListeners(this.entity, infoWindowEventNames, events)
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.entity === null) return
		const newProps = getNewValues(this.props, nextProps)
		if (newProps) {
			const { options, events } = separateOptionsAndEvents(newProps, infoWindowEventNames)
			if (options) this.entity.setOptions(options)
			if (events) addListeners(this.entity, infoWindowEventNames, events)
		}
	}

	componentWillUnmount() {
		if (this.entity) this.entity.setMap(null)
		removeListeners(this.listeners)
		this.entity = null
	}

	entity: null | InfoWindowType = null
	listeners: Array<Object> = []

	render() {
		return null
	}
}
const InfoWindowWithContext = (props: BaseProps): React.Node => (
	<MapConsumer>{(mapContext: MapContext) => <InfoWindow {...mapContext} {...props} />}</MapConsumer>
)

export default InfoWindowWithContext
