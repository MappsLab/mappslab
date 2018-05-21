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
			center: { lat: 40.65, lng: -111.85 },
			zoom: 10,
			...this.props.options,
			disableDefaultUI: true,
			zoomControlOptions: false,
			streetViewControlOptions: false,
		}
		// $FlowFixMe
		this.map = new google.maps.Map(this.mapRef.current, options) // eslint-disable-line no-undef
	}

	mapRef: { current: any }

	render() {
		return <div style={{ width: '100%', height: '100%' }} ref={this.mapRef} />
	}
}

export default Mapp
