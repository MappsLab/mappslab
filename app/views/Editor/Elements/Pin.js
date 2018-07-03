// @flow
import React from 'react'
import Mapp from 'mapp'

/**
 * Pin
 */

type Props = {
	// ...
}

type State = {
	// ...
}

class Pin extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	constructor(props) {
		super(props)
	}

	render() {
		// console.log(this.props)
		const { lat, lang } = this.props
		const position = {
			lat,
			lng: lang,
		}
		return <Mapp.Marker position={position} />
	}
}

export default Pin
