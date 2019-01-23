// @flow
import React from 'react'
import { Marker, CustomPopup, markerEventNames } from 'mapp'
import { State } from 'react-automata'
import type { PinType } from 'Types'
import { eventsReducer } from 'Utils/data'
import { MapConsumer } from '../Provider'
import type { ProviderProps } from '../Provider'
import { PopupWrapper } from './InfoPopups'
import PinInspector from './PinInspector'
import { pinEvents } from './pinEventHandlers'

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
			const { state } = result
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
		const { pin, inspectedItem } = this.props
		const { mouseOver, events } = this.state
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
				events={events}
				options={options}
				render={({ anchor }) =>
					anchor ? (
						<React.Fragment>
							{!isInspected && mouseOver ? (
								<CustomPopup anchor={anchor}>
									<PopupWrapper>
										<p>{pin.title}</p>
									</PopupWrapper>
								</CustomPopup>
							) : null}
							{isInspected ? (
								<State is="Lesson.Inspect">
									<CustomPopup anchor={anchor}>
										<PinInspector pin={pin} closeInspector={this.closeInspector} />
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
