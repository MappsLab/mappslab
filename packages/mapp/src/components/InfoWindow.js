// @flow
import * as React from 'react'
import { addListeners, removeListeners } from '../utils/listeners'
import type { LatLng, Map, InfoWindow as InfoWindowType } from '../types'

/**
 * InfoWindow
 */

const infoWindowEvents = {
	onCloseClick: 'closeclick',
	onContentChanged: 'content_changed',
	onDOMReady: 'domready',
	onPositionChanged: 'position_changed',
	onZindexChanged: 'zindex_changed',
}

type Props = {
	position: LatLng,
	map: Map,
	children: React.Node,
}

type State = {
	// ...
}

class InfoWindow extends React.Component<Props, State> {
	componentDidMount() {
		console.log('mounted', this.props)
		const { position, map } = this.props
		this.entity = new window.google.maps.InfoWindow({
			position,
			content: this.props.children,
		})
		this.entity.open(map)
		if (this.entity) this.listeners = addListeners(this.entity, infoWindowEvents, this.props)
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

export default InfoWindow
