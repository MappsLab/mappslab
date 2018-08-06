// @flow
import React from 'react'
import { Marker, CustomPopup } from 'mapp'
import styled from 'styled-components'
import { Action } from 'react-automata'
import type { PinType, NewPinType } from '../../../types'
import { HoverInfo } from './InfoPopups'

// Make an object for the sake of flow
const _eventNames = {
	onClick: '',
	onDblClick: '',
	onEntry: '',
	onMouseenter: '',
	onMouseleave: '',
}

const eventNames = Object.keys(_eventNames)

type Event = $Keys<typeof _eventNames>

/**
 * Pin
 */

type Props = {
	pin: PinType | NewPinType,
	active: boolean,
}

type State = {
	mouseOver: boolean,
}

class Pin extends React.Component<Props, State> {
	state = {
		mouseOver: false,
	}

	getEvents = () => {
		return {
			onMouseOver: this.enterHover,
			onMouseOut: this.leaveHover,
		}
	}

	enterHover = () => {
		this.setState({ mouseOver: true })
	}

	leaveHover = () => {
		this.setState({ mouseOver: false })
	}

	render() {
		const { lat, lang, title } = this.props.pin
		const { active } = this.props
		const { mouseOver } = this.state
		const position = {
			lat,
			lng: lang,
		}
		return (
			<Marker
				position={position}
				events={this.getEvents()}
				render={({ anchor }) =>
					anchor ? (
						<React.Fragment>
							<Action show="allowPinHover">
								<CustomPopup anchor={anchor}>
									<HoverInfo visible={mouseOver} title={title || ''} />
								</CustomPopup>
							</Action>
							<Action show="editPin">
								<CustomPopup anchor={anchor}>
									<p>What is up, edit</p>
								</CustomPopup>
							</Action>
							<Action show="inspectPin">
								<CustomPopup anchor={anchor}>
									<p>What is up, inspect</p>
								</CustomPopup>
							</Action>
						</React.Fragment>
					) : null
				}
			/>
		)
	}
}

export default Pin
