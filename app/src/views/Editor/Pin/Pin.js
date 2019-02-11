// @flow
import React from 'react'
import { Marker, CustomPopup, markerEventNames } from 'mapp'
import { State } from 'react-automata'
import type { PinType } from 'Types/Pin'
import { eventsReducer, isFunc } from 'Utils/data'
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

type PinProps = BaseProps & ProviderProps

type PinState = {
	mouseOver: boolean,
	events: {},
}

class Pin extends React.Component<PinProps, PinState> {
	static defaultProps = {
		viewer: null,
	}

	state = {
		mouseOver: false,
		events: {},
	}

	componentDidMount() {
		this.setState({ events: this.getPinEventHandlers() })
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

	getPinEventHandlers = () =>
		markerEventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)

	render() {
		const { pin, inspectedItem, mapData } = this.props
		const { mouseOver } = this.state
		const { lat, lng } = pin
		const isInspected = inspectedItem && inspectedItem.uid === pin.uid
		const options = {
			position: {
				lat,
				lng,
			},
		}
		return (
			<Marker
				// TODO: get all of these ahead of time
				events={this.getPinEventHandlers()}
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
