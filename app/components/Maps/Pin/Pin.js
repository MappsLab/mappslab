// @flow
import React from 'react'
import { Marker, CustomPopup } from 'mapp'
import * as R from 'ramda'
import { Action } from 'react-automata'
import type { PinType, NewPinType, ViewerType } from 'Types'
import { Button } from 'Components/UI'
import { PopupWrapper } from './InfoPopups'
import AddEditPinForm from '../Forms/AddEditPin'
import withPinModes from './pinModes'
import { CLICKED_EDIT_PIN } from '../statechart'
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
	transition: (string) => ({}) => void,
}

type State = {
	mouseOver: boolean,
}

class Pin extends React.Component<Props, State> {
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
		this.props.transition(CLICKED_EDIT_PIN)()
	}

	render() {
		const { active, pin, mapUid, updatePinSuccess, viewer } = this.props
		const { lat, lang, title, description, owner } = pin
		const { mouseOver } = this.state
		const options = {
			position: {
				lat,
				lng: lang,
			},
		}
		return (
			<Marker
				options={options}
				events={this.getPinEventHandlers()}
				render={({ anchor }) =>
					anchor ? (
						<React.Fragment>
							<Action show="allowPinHover">
								{mouseOver && (
									<CustomPopup anchor={anchor}>
										<PopupWrapper>
											<p>{title}</p>
											<p>{pin.owner.name}</p>
										</PopupWrapper>
									</CustomPopup>
								)}
							</Action>
							<Action show="editPin">
								{active && (
									<CustomPopup anchor={anchor}>
										<PopupWrapper>
											<AddEditPinForm pin={pin} mapUid={mapUid} onSuccess={updatePinSuccess} />
										</PopupWrapper>
									</CustomPopup>
								)}
							</Action>
							<Action show="inspectPin">
								{active && (
									<CustomPopup anchor={anchor}>
										<PopupWrapper>
											<h2>{title}</h2>
											<p>{description}</p>
											<p>{owner.name}</p>
											{viewer.uid === owner.uid && <Button onClick={this.handleEditButtonClick}>Edit</Button>}
										</PopupWrapper>
									</CustomPopup>
								)}
							</Action>
						</React.Fragment>
					) : null
				}
			/>
		)
	}
}

export default withPinModes(Pin)
