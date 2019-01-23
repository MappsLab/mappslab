// @flow
import React from 'react'
import { Marker, CustomPopup, markerEventNames } from 'mapp'
import { State } from 'react-automata'
import type { PinType } from 'Types'
import { MapConsumer } from '../Provider'
import type { ProviderProps } from '../Provider'
import { getHandlersForState } from './pinEventHandlers'
import { PopupWrapper } from './InfoPopups'
import PinInspector from './PinInspector'
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
		const handlers = getHandlersForState(machineState.value)
		if (handlers[eventName]) {
			const newState = handlers[eventName](payload, this.props)
			if (newState) this.setState(newState)
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
				events={this.getPinEventHandlers()}
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
