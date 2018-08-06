// @flow
import React from 'react'
import Mapp from 'mapp'
import { Action } from 'react-automata'
import type { PinType, NewPinType } from '../../../types'
import PinInfoWindow from './PinInfoWindow'

/**
 * Pin
 */

type Props = {
	pin: PinType | NewPinType,
}

type State = {
	showInfo: boolean,
}

class Pin extends React.Component<Props, State> {
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
		const { lat, lang, title } = this.props.pin
		const { active } = this.props
		const position = {
			lat,
			lng: lang,
		}
		return (
			<Mapp.Marker
				position={position}
				onClick={this.showInfo}
				render={({ anchor }) =>
					anchor && active ? (
						<React.Fragment>
						<Action show="editPin">
						null
						</Action>
						<Action show="inspectPin">

							<PinInfoWindow anchor={anchor} onCloseClick={this.hideInfo} content={newTitle || title} />
						</Action>
						</React.Fragment>
					) : null
				}
			/>
		)
	}
}

export default Pin
