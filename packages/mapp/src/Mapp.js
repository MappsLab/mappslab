// @flow
/* eslint-disable-next-line no-unused-vars */
/* global google */

import * as React from 'react'
import loadGoogleMaps from './services/googleMaps'
import { addListeners, removeListeners } from './utils/listeners'
import type { LatLng, LatLngBoundsLiteral } from './types/latLngTypes'
import type { OverlayView } from './types/overlayTypes'
import type { Map, MapsEventListener, NamedEventListeners } from './types/mapTypes'
import { mappedMapEventNames } from './eventNames'
/**
 * Context Setup
 */

export type MapContextType = {
	map?: Map,
}

const MappContext = React.createContext<MapContextType>({})
export const MappConsumer = MappContext.Consumer

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
	fitBounds: (LatLngBoundsLiteral, number) => void,
	addEventListeners: (eventHandlers: NamedEventListeners) => void,
	removeEventListeners: (eventHandlers: NamedEventListeners) => void,
}

export type MappRenderProps =
	| {
			googleMap: Map,
			overlay: OverlayView,
			utils: MappUtils,
	  }
	| {
			errored: boolean,
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
	errored: boolean,
}

const defaultStyle = { width: '100%', height: '100%', position: 'absolute' }

class Mapp extends React.Component<Props, State> {
	// static Marker = Marker
	// static InfoWindow = InfoWindow
	// static CustomPopup = CustomPopup

	static defaultProps = {
		initialOptions: {},
		style: defaultStyle,
	}

	constructor(props: Props) {
		super(props)
		this.mapRef = React.createRef()
		this.state = {
			ready: false,
			errored: false,
		}
	}

	overlay: OverlayView

	map: Map

	mapRef: { current: any }

	async componentDidMount() {
		const { APIKey, initialOptions } = this.props
		// TODO not sure if this will work with  multiple rapid calls.. figure it out
		try {
			await loadGoogleMaps(APIKey)
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(e)
			this.setState({
				errored: true,
			})
			return
		}

		this.map = new google.maps.Map(this.mapRef.current, initialOptions) // eslint-disable-line no-undef
		google.maps.event.addListenerOnce(this.map, 'projection_changed', () => {
			this.setState({
				ready: true,
			})
		})

		this.overlay = new google.maps.OverlayView()
		this.overlay.setMap(this.map)
	}

	listeners: Array<MapsEventListener> = []

	getUtils = (): MappUtils => {
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
			const newCenter = this.overlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point(newX, newY))
			this.map.panTo(newCenter)
		}

		const zoom = (diff: number): void => {
			const currentZoom = this.map.getZoom()
			const newZoom = currentZoom + diff
			this.map.setZoom(newZoom)
		}

		const fitBounds = (bounds: LatLngBoundsLiteral, padding: number) => {
			this.map.fitBounds(bounds, padding)
		}

		const zoomFactory = (diff: number) => () => zoom(diff)

		const zoomIn = zoomFactory(1)
		const zoomOut = zoomFactory(-1)

		return {
			panTo,
			fitBounds,
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

	addEventListeners = (eventHandlers: NamedEventListeners) => {
		this.listeners = addListeners(this.map, mappedMapEventNames, eventHandlers)
	}

	render() {
		const { style, render } = this.props
		const { ready, errored } = this.state
		const value = {
			map: this.map,
		}
		return (
			<MappContext.Provider value={value}>
				<div style={style} ref={this.mapRef} />
				{errored
					? render({
							errored,
					  })
					: ready
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
