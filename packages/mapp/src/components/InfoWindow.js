// @flow
import * as React from 'react'
import { addListeners, removeListeners } from '../utils/listeners'
import type { LatLng, Map, Marker, InfoWindow as InfoWindowType, InfoWindowOptions } from '../types'
import { MapConsumer } from '../Mapp'
import type { MapContextType as MapContext } from '../Mapp'

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

type BaseProps = {
	position?: LatLng,
	anchor?: Marker,
	events: {},
	options: InfoWindowOptions,
}

type Props = BaseProps & {
	map: Map,
}

type State = {
	// ...
}

const defaultProps = {
	position: null,
	anchor: null,
}

class InfoWindow extends React.Component<Props, State> {
	entity: null | InfoWindowType = null

	listeners: Array<Object> = []

	static defaultProps = defaultProps

	constructor(props: Props) {
		super(props)
		if (!props.position && !props.anchor) throw new Error('InfoWindow must have either a `anchor` or `position` prop')
		if (props.position && props.anchor) throw new Error('InfoWindow must have either a `anchor` or `position` prop, not both')
	}

	componentDidMount() {
		const { map, anchor, options, events } = this.props
		this.entity = new window.google.maps.InfoWindow(options)
		this.entity.open(map, anchor)
		if (this.entity !== null) this.listeners = addListeners(this.entity, infoWindowEventNames, events)
	}

	// componentWillReceiveProps(nextProps: Props) {
	// 	if (this.entity === null) return
	// 	const newProps = getNewValues(this.props, nextProps)
	// 	// if (newProps) {
	// 	// 	const { options, events } = separateOptionsAndEvents(newProps, infoWindowEventNames)
	// 	// 	if (options) this.entity.setOptions(options)
	// 	// 	if (events) addListeners(this.entity, infoWindowEventNames, events)
	// 	// }
	// }

	componentWillUnmount() {
		removeListeners(this.listeners)
		this.entity = null
	}

	render() {
		return null
	}
}
const InfoWindowWithContext = (props: BaseProps): React.Node => (
	<MapConsumer>
		{// $FlowFixMe
		(mapContext: MapContext) => <InfoWindow {...mapContext} {...props} />}
	</MapConsumer>
)

InfoWindowWithContext.defaultProps = defaultProps

export default InfoWindowWithContext
