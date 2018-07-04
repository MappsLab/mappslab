// @flow
import React from 'react'
import Mapp from 'mapp'
import type { PinType } from '../../../types'
import PinInfoWindow from './PinInfoWindow'

/**
 * Pin
 */

type State = {
	showInfo: boolean,
}

class Pin extends React.Component<PinType, State> {
	state = {
		showInfo: false,
		newTitle: undefined,
	}

	showInfo = () => {
		this.setState({ showInfo: true })
	}

	hideInfo = () => {
		console.log('closing')
		this.setState({ showInfo: false })
	}

	render() {
		const { showInfo, newTitle } = this.state
		const { lat, lang, title } = this.props
		const position = {
			lat,
			lng: lang,
		}
		return (
			<Mapp.Marker
				position={position}
				onClick={this.showInfo}
				render={({ anchor }) =>
					showInfo ? <PinInfoWindow anchor={anchor} onCloseClick={this.hideInfo} content={newTitle || title} /> : null
				}
			/>
		)
	}
}

export default Pin
