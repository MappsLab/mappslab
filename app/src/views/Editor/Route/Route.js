// @flow
import React from 'react'
import { PolyLine, CustomPopup } from 'mapp'
import { polylineEventNames } from 'mapp/eventNames'
import type { LatLng } from 'mapp/types'
// import { State } from 'react-automata'
import type { RouteType, PinType } from 'Types'
import { MapConsumer } from '../Provider'
import type { ProviderProps } from '../Provider'
import { getHandlersForState } from './routeEventHandlers'
// import { PopupWrapper } from './InfoPopups'
// import PinInspector from './PinInspector'

const getPathFromPins = (pins: Array<PinType>): Array<LatLng> =>
	pins.map(({ lat, lng }) => ({
		lat,
		lng,
	}))

/**
 * Pin
 */

type BaseProps = {
	route: RouteType,
}

type RouteProps = BaseProps & ProviderProps

type RouteState = {
	mouseOver: boolean,
}

class Route extends React.Component<RouteProps, RouteState> {
	static defaultProps = {
		viewer: null,
	}

	state = {
		mouseOver: false,
	}

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 */

	// this.events =

	getOptions() {
		const { route } = this.props
		const { mouseOver } = this.state
		const path = getPathFromPins(route.pins)
		return {
			path,
			strokeColor: 'hsl(5, 94%, 60%)',
			strokeOpacity: mouseOver ? 0.8 : 0.3,
			strokeWeight: mouseOver ? 6 : 4,
		}
	}

	handleEvent = (eventName: string) => (payload) => {
		const { machineState } = this.props
		const handlers = getHandlersForState(machineState.value)
		if (handlers[eventName]) {
			const newState = handlers[eventName](payload, this.props)
			if (newState) this.setState(newState)
		}
	}

	getEventHandlers = () =>
		polylineEventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)

	render() {
		const options = this.getOptions()
		return <PolyLine events={this.getEventHandlers()} options={options} />
	}
}

/**
 * Wrapper
 */

const Wrapper = ({ route }: BaseProps) => (
	<MapConsumer>
		{(contextValue) => (
			//
			<Route route={route} {...contextValue} />
		)}
	</MapConsumer>
)

export default Wrapper
