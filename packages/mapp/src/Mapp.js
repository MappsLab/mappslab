// @flow
/* eslint-disable-next-line no-unused-vars */
/* global google */

import * as React from 'react'
import loadGoogleMaps from './services/googleMaps'
// import { getNewValues, separateOptionsAndEvents } from './utils/data'
import { addListeners, removeListeners } from './utils/listeners'
import type { Map, OverlayView, LatLng } from './types'
import { mappedMapEventNames } from './eventNames'
/**
 * Context Setup
 */

const MappContext = React.createContext()
export const MappConsumer = MappContext.Consumer

export type MapContextType = {
	map: Map,
}

type EventHandlers = {}

declare var google: any

type Offset = {
	x?: number,
	y?: number,
}

export type MappUtils = {
	zoom: (number) => void,
	zoomIn: () => void,
	zoomOut: () => void,
	panTo: (LatLng, Offset) => void,
	addEventListeners: (eventHandlers: EventHandlers) => void,
	removeEventListeners: (eventHandlers: EventHandlers) => void,
}

export type MappRenderProps = {
	googleMap: Map,
	overlay: OverlayView,
	utils: MappUtils,
}

/**
 * Events
 */

/**
 * Types
 */

type Props = {
	APIKey: string,
	initialOptions?: Object,
	render: (MappRenderProps) => React.Node,
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
	listeners: Array<{}> = []

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
		google.maps.event.addListener(this.map, 'click', (e) => {
			console.log('Map', 'click', e.xa)
		})

		this.overlay = new google.maps.OverlayView()
		this.overlay.setMap(this.map)
	}

	getUtils = () => {
		// const pixelToLatLng = (x: number, y: number) =>
		// 	this.overlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point(x, y))

		/**
		 * panTo
		 * Pans to a geo point with an optional x / y pixel offset
		 *
		 * @param {LatLng} latLng
		 * @param {Offset} [offset]
		 * @returns {void}
		 */
		const panTo = (latLng: LatLng, offset?: Offset): void => {
			const { x, y } = {
				x: 0,
				y: 0,
				...offset,
			}
			const actual = this.overlay.getProjection().fromLatLngToContainerPixel(new google.maps.LatLng(latLng))
			const newX = actual.x + x
			const newY = actual.y + y
			return this.overlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point(newX, newY))
		}

		const zoom = (diff: number): void => {
			const currentZoom = this.map.getZoom()
			const newZoom = currentZoom + diff
			this.map.setZoom(newZoom)
		}

		const zoomFactory = (diff: number) => () => zoom(diff)

		const zoomIn = zoomFactory(1)
		const zoomOut = zoomFactory(-1)

		return {
			panTo,
			zoom,
			zoomIn,
			zoomOut,
			removeEventListeners: this.removeEventListeners,
			addEventListeners: this.addEventListeners,
		}
	}

	removeEventListeners = () => {
		removeListeners(this.listeners)
	}

	addEventListeners = (eventHandlers: EventHandlers) => {
		this.listeners = addListeners(this.map, mappedMapEventNames, eventHandlers)
	}

	overlay: OverlayView

	map: Object

	mapRef: { current: any }

	render() {
		const { style, render } = this.props
		const { ready } = this.state
		const value = {
			map: this.map,
		}
		return (
			<MappContext.Provider value={value}>
				<div style={style} ref={this.mapRef} />
				{ready
					? render({
							overlay: this.overlay,
							googleMap: this.map,
							utils: this.getUtils(),
							addEventListeners: this.addEventListeners,
							removeEventListeners: this.removeEventListeners,
					  })
					: null}
			</MappContext.Provider>
		)
	}
}

export default Mapp
