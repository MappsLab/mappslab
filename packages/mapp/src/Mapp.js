// @flow
import * as React from 'react'
import loadGoogleMaps from './services/googleMaps'
// import { getNewValues, separateOptionsAndEvents } from './utils/data'
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
	initialOptions?: Object,
	render: ({ map: Map }) => React.Node,
	style?: Object,
}

type State = {
	ready: boolean,
}

const defaultStyle = { width: '100%', height: '100%', position: 'absolute' }

class Mapp extends React.Component<Props, State> {
	// static Marker = Marker
	// static InfoWindow = InfoWindow
	// static CustomPopup = CustomPopup

	static defaultProps = {
		initialOptions: {},
		pins: [],
		style: defaultStyle,
	}

	constructor(props: Props) {
		super(props)
		this.mapRef = React.createRef()
		this.state = {
			ready: false,
		}
	}

	async componentDidMount() {
		const { APIKey, initialOptions } = this.props
		// TODO not sure if this will work with  multiple rapid calls.. figure it out
		await loadGoogleMaps(APIKey)

		// $FlowFixMe
		this.map = new google.maps.Map(this.mapRef.current, initialOptions) // eslint-disable-line no-undef
		google.maps.event.addListenerOnce(this.map, 'projection_changed', () => {
			this.setState({
				ready: true,
			})
		})
		this.overlay = new google.maps.OverlayView()
		this.overlay.setMap(this.map)
	}

	getUtils() {
		// console.log(this.overlay.projection.fromContainerPixelToLatLng)
		// const projection = this.overlay.projection

		const pixelToLatLng = (x, y) => this.overlay.projection.fromContainerPixelToLatLng(new google.maps.Point(x, y))

		const latLngWithPixelOffset = (latLng, x, y) => {
			const actual = this.overlay.projection.fromLatLngToContainerPixel(new google.maps.LatLng(latLng))
			const newX = actual.x + x
			const newY = actual.y + y
			return this.overlay.projection.fromContainerPixelToLatLng(new google.maps.Point(newX, newY))
		}

		return { pixelToLatLng, latLngWithPixelOffset }
	}

	removeEventListeners = (eventHandlers) => {
		removeListeners(eventHandlers)
	}

	addEventListeners = (eventHandlers) => {
		addListeners(this.map, mapEventNames, eventHandlers)
	}

	map: Object

	mapRef: { current: any }

	render() {
		const { style, render } = this.props
		const { ready } = this.state
		const contextValue = {
			map: this.map,
		}
		return (
			<MapContext.Provider value={contextValue}>
				<div style={style} ref={this.mapRef} />
				{ready
					? render({
							googleMap: this.map,
							utils: this.getUtils(),
							addEventListeners: this.addEventListeners,
							removeEventListeners: this.removeEventListeners,
					  })
					: null}
			</MapContext.Provider>
		)
	}
}

export default Mapp
