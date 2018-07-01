// @flow
import * as React from 'react'
import Marker from './components/Marker'
import InfoWindow from './components/InfoWindow'
import loadGoogleMaps from './services/googleMaps'

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
		const { APIKey } = this.props
		// TODO not sure if this will work with  multiple rapid calls.. figure it out
		await loadGoogleMaps(APIKey)

		// $FlowFixMe
		const options = {
			center: { lat: 40.65, lng: -111.85 },
			zoom: 10,
			...this.props.options,
			disableDefaultUI: true,
			zoomControlOptions: false,
			streetViewControlOptions: false,
		}
		// $FlowFixMe
		this.map = new google.maps.Map(this.mapRef.current, options) // eslint-disable-line no-undef
		/* eslint-disable-next-line */
		this.setState({
			ready: true,
		})
	}

	map: Object

	mapRef: { current: any }

	render() {
		const { style, render } = this.props
		return (
			<div>
				<div style={style} ref={this.mapRef} />
				{this.state.ready ? render({ map: this.map }) : null}
			</div>
		)
	}
}

export default Mapp
