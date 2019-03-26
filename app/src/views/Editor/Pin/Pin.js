// @flow
import React from 'react'
import { Marker, CustomPopup, markerEventNames } from 'mapp'
import { State } from 'react-automata'
import type { PinType } from 'Types/Pin'
import { eventsReducer, isFunc, getStateString } from 'Utils/data'
import { MapConsumer } from '../Provider'
import type { ProviderProps } from '../Provider'
import PinInspector from './PinInspector'
import { pinEvents } from './pinEventHandlers'
import PinHoverPopup from './PinHoverPopup'

/**
 * Pin
 */

type BaseProps = {
	pin: PinType,
}

export type PinProps = BaseProps & ProviderProps

export type PinState = {
	mouseOver: boolean,
}

class Pin extends React.Component<PinProps, PinState> {
	static defaultProps = {
		viewer: null,
	}

	constructor(props) {
		super(props)
		this.eventHandlers = markerEventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)

		this.state = {
			mouseOver: false,
		}
	}

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 */

	handleEvent = (eventName: string) => (payload) => {
		const { machineState } = this.props
		const handler = eventsReducer(pinEvents, machineState.value, eventName)
		if (handler) {
			const result = handler({ payload, props: this.props })
			const { state, actions } = result
			if (actions) {
				Object.keys(actions).forEach((key) => {
					const action = actions[key]
					if (isFunc(action)) action()
				})
			}
			if (state) this.setState(state)
		}
	}

	closeInspector = () => {
		const { transition } = this.props
		transition('close', { inspectedItem: null })
	}

	eventHandlers: any

	isClickable(): boolean {
		const { machineState, viewer, pin } = this.props
		const { route } = pin
		const stateString = getStateString(machineState.value)
		if (stateString === 'Lesson.DropPin.DropMode.Connect') return false
		if (stateString === 'Lesson.DropPin.DropMode.Drop') {
			if (route && (!route.isFirst || !route.isLast)) return false
			if (!viewer) return false
			if (pin.owner.uid !== viewer.uid) return false
		}
		return true
	}

	render() {
		const { pin, inspectedItem, mapData } = this.props
		const { mouseOver } = this.state
		const { lat, lng, route } = pin
		const isInspected = inspectedItem && inspectedItem.uid === pin.uid
		const enabled = this.isClickable()
		// // If we are already connecting to a pin, disable
		// stateString === 'Lesson.DropPin.DropMode.Connect' ||
		// // Or, if we are in drop mode
		// (stateString === 'Lesson.DropPin.DropMode.Drop' &&
		// 	// And if the pin is within a route
		// 	route &&
		// 	// And the pin is neither first nor last
		// 	!route.isFirst &&
		// 	!route.isLast &&
		// 	// And the viewer owns this pin
		// 	(viewer && viewer.uid !== pin.owner.uid))
		const options = {
			position: {
				lat,
				lng,
			},
			clickable: enabled,
			opacity: enabled ? 1 : 0.3,
		}
		return (
			<Marker
				// TODO: get all of these ahead of time
				events={this.eventHandlers}
				options={options}
				render={({ anchor }) =>
					anchor ? (
						<React.Fragment>
							{!isInspected && mouseOver ? (
								<CustomPopup anchor={anchor}>
									<PinHoverPopup pin={pin} />
								</CustomPopup>
							) : null}
							{isInspected ? (
								<State is="Lesson.Inspect">
									<CustomPopup anchor={anchor}>
										<PinInspector pin={pin} mapUid={mapData.uid} closeInspector={this.closeInspector} />
									</CustomPopup>
								</State>
							) : null}
						</React.Fragment>
					) : null
				}
			/>
		)
	}
}

/**
 * Wrapper
 */

const Wrapper = ({ pin }: BaseProps) => (
	<MapConsumer>
		{(contextValue) => (
			//
			<Pin pin={pin} {...contextValue} />
		)}
	</MapConsumer>
)

export default Wrapper
