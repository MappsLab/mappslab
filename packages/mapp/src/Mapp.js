// @flow
import * as React from 'react'
import Marker from './components/Marker'
import InfoWindow from './components/InfoWindow'
import loadGoogleMaps from './services/googleMaps'
import { getNewValues, separateOptionsAndEvents } from './utils/data'
import { addListeners, removeListeners } from './utils/listeners'

const MapContext = React.createContext()
export const MapConsumer = MapContext.Consumer

const mapEventNames = {
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

import type { Map } from './types'

type Props = {
	APIKey: string,
	options?: Object,
	render: ({ map: Map }) => React.Node,
	style?: Object,
}

type State = {
	ready: boolean,
}

const defaultStyle = { width: '100%', height: '100%', position: 'absolute' }

class Mapp extends React.Component<Props, State> {
	static Marker = Marker
	static InfoWindow = InfoWindow

	static defaultProps = {
		options: {},
		pins: [],
		style: defaultStyle,
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			ready: false,
		}
		this.mapRef = React.createRef()
	}

	async componentDidMount() {
		const { APIKey, ...props } = this.props
		// TODO not sure if this will work with  multiple rapid calls.. figure it out
		await loadGoogleMaps(APIKey)
		const { options, events } = separateOptionsAndEvents(props, mapEventNames)

		// $FlowFixMe
		this.map = new google.maps.Map(this.mapRef.current, options) // eslint-disable-line no-undef
		if (events) addListeners(this.map, mapEventNames, events)
		/* eslint-disable-next-line */
		this.setState({
			ready: true,
		})
	}

	componentWillReceiveProps(nextProps) {
		if (!this.map) return null
		const newProps = getNewValues(this.props, nextProps)
		if (newProps) {
			const { options, events } = separateOptionsAndEvents(newProps, mapEventNames)
			if (options) this.map.setOptions(options)
			if (events) addListeners(this.map, mapEventNames, events)
		}
	}

	map: Object

	mapRef: { current: any }

	render() {
		const { style, render } = this.props
		const contextValue = {
			map: this.map,
		}
		return (
			<MapContext.Provider value={contextValue}>
				<div style={style} ref={this.mapRef} />
				{this.state.ready ? render({ map: this.map }) : null}
			</MapContext.Provider>
		)
	}
}

export default Mapp
