// @flow
import React from 'react'

import loadGoogleMaps from './services/googleMaps'

type Props = {
	APIKey: string,
	options?: Object,
}

class Mapp extends React.Component<Props> {
	static defaultProps = {
		options: {},
	}

	constructor(props: Props) {
		super(props)
		this.mapRef = React.createRef()
	}

	async componentDidMount() {
		const { APIKey } = this.props
		await loadGoogleMaps(APIKey)

		// $FlowFixMe
		const options = {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8,
			...this.props.options,
			disableDefaultUI: true,
			zoomControlOptions: false,
			streetViewControlOptions: false,
		}
		// $FlowFixMe
		this.map = new window.google.maps.Map(this.mapRef.current, options) // eslint-disable-line no-undef
	}

	mapRef: { current: any }

	render() {
		return <div style={{ width: 500, height: 500 }} ref={this.mapRef} />
	}
}

export default Mapp
