// @flow
import React from 'react'
import NativeListener from 'react-native-listener'
import { Marker, CustomPopup } from 'mapp'
import * as R from 'ramda'
import { Action, State } from 'react-automata'
import type { PinType, NewPinType, ViewerType } from 'Types'
import { Button } from 'Components/UI'
import { PopupWrapper } from './InfoPopups'
import { CreatePinForm, UpdatePinForm } from '../Forms/CreateUpdatePin'
import withPinModes from './pinModes'
import { transitions, states } from '../statechart'

// Make an object for the sake of flow
const _eventNames = {
	onClick: '',
	onDblClick: '',
	onEntry: '',
	onMouseOver: '',
	onMouseOut: '',
}

const eventNames = Object.keys(_eventNames)

type Event = $Keys<typeof _eventNames>

/**
 * Pin
 */

type Props = {
	pin: PinType | NewPinType,
	viewer: ViewerType,
	active: boolean,
	mapUid: string,
	updatePinSuccess: () => void,
	mode: string,
	transition: (string) => (?{}) => void,
}

type PinState = {
	mouseOver: boolean,
}

class Pin extends React.Component<Props, PinState> {
	state = {
		mouseOver: false,
	}

	getPinEventHandlers = () =>
		eventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 * See ./modes for the handlers for each mode.
	 */

	handleEvent = (eventName: Event) => (payload) => {
		const { mode } = this.props
		const handler = R.path(['props', 'modes', mode, eventName])(this)
		if (handler) {
			const newState = handler(this.props)(payload)
			if (newState) this.setState(newState)
		}
	}

	handleEditButtonClick = (e) => {
		e.stopPropagation()
		this.props.transition(transitions.CLICKED_EDIT_PIN)()
	}

	render() {
		const { active, pin, mapUid, updatePinSuccess, viewer } = this.props
		const { lat, lng, title, description, owner } = pin
		const { mouseOver } = this.state
		const options = {
			position: {
				lat,
				lng,
			},
		}
		return (
			<Marker
				options={options}
				events={this.getPinEventHandlers()}
				render={({ anchor }) =>
					anchor ? (
						<React.Fragment>
							<Action is="allowPinHover">
								{mouseOver && (
									<CustomPopup anchor={anchor}>
										<PopupWrapper>
											<p>{title}</p>
											<p>{pin.owner.name}</p>
										</PopupWrapper>
									</CustomPopup>
								)}
							</Action>
							{active && (
								<CustomPopup anchor={anchor}>
									<PopupWrapper>
										<State is={states.EDIT_PIN}>
											<UpdatePinForm pin={pin} mapUid={mapUid} onSuccess={updatePinSuccess} />
										</State>
										<State is={`${states.CREATE_PIN}*`}>
											<CreatePinForm pin={pin} mapUid={mapUid} onSuccess={updatePinSuccess} />
										</State>
										<State is={states.INSPECT_PIN}>
											<h2>{title}</h2>
											<p>{description}</p>
											<p>{owner.name}</p>
											{viewer.uid === owner.uid && (
												<NativeListener onClick={this.handleEditButtonClick}>
													<Button>Edit</Button>
												</NativeListener>
											)}
										</State>
									</PopupWrapper>
								</CustomPopup>
							)}
						</React.Fragment>
					) : null
				}
			/>
		)
	}
}

export default withPinModes(Pin)
