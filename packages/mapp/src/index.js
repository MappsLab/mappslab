// @flow
import React from 'react'

import loadGoogleMaps from './services/googleMaps'

type Props = {
	APIKey: string,
	options?: Object,
	pins: Array<Object>,
}

type State = {
	created: boolean,
}

class Mapp extends React.Component<Props, State> {
	static defaultProps = {
		options: {},
		pins: [],
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			created: false,
		}
		this.mapRef = React.createRef()
	}

	async componentDidMount() {
		const { APIKey } = this.props
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
		this.setState({
			created: true,
		})
	}

	map: Object

	mapRef: { current: any }

	loadPins() {
		console.log(this.props.pins)
		this.props.pins.map(
			(p) =>
				new google.maps.Marker({
					// eslint-disable-line no-undef
					position: {
						lat: p.lat,
						lng: p.lang,
					},
					map: this.map,
					title: p.title,
				}),
		)
	}

	render() {
		return (
			<div style={{ width: '100%', height: '100%' }} ref={this.mapRef}>
				{this.state.created ? this.loadPins() : null}
			</div>
		)
	}
}

export default Mapp
