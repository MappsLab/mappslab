import React from 'react'
import { PolyLine } from 'mapp'
import { unwindEdges } from '@good-idea/unwind-edges'
import { LatLng, polylineEventNames } from 'mapp'
import { Pin, Route as RouteType } from 'Types'
import { getStateString } from 'Utils/data'
import { InspectorConsumer } from '../ItemInspector'
import { ItemInspectorProviderProps } from '../ItemInspector'
import { MapConsumer } from '../Provider'
import { ProviderProps } from '../Provider'
import RouteHoverPopup from './RouteHoverPopup'

const getPathFromPins = (pins: Array<Pin | LatLng>): Array<LatLng> =>
	pins.map(({ lat, lng }) => ({
		lat,
		lng,
	}))

/**
 * Route
 */

type BaseProps = {
	route: RouteType
}

type $PropertyType<T extends object, K extends keyof T> = T[K]

interface RouteProps extends ProviderProps {
	route: RouteType
	active?: boolean
	clickable?: boolean
	inspectItem: $PropertyType<ItemInspectorProviderProps, 'inspectItem'>
}

type RouteState = {
	mouseOver: boolean
	mouseLatLng?: LatLng
}

class RouteMain extends React.Component<RouteProps, RouteState> {
	static defaultProps = {
		viewer: null,
		active: false,
	}

	state = {
		mouseOver: false,
		mouseLatLng: undefined,
	}

	constructor(props) {
		super(props)
		this.eventHandlers = polylineEventNames.reduce(
			(acc, eventName) =>
				Object.prototype.hasOwnProperty.call(this, eventName)
					? {
							...acc,
							// $FlowFixMe
							[eventName]: this[eventName],
					  }
					: acc,
			{},
		)
		this.state = {
			mouseOver: false,
			mouseLatLng: undefined,
		}
	}

	/** TODO: Get GMAPS input event type */

	onClick = (e: { latLng: LatLng }) => {
		const { route, inspectItem } = this.props
		this.setState({ mouseOver: false })
		const position = e.latLng
		inspectItem(route, position)
	}

	onMouseOver = (e) => {
		this.setState({
			mouseOver: true,
			mouseLatLng: e.latLng,
		})
	}

	onMouseOut = () => {
		this.setState({
			mouseOver: false,
			mouseLatLng: null,
		})
	}

	onMouseMove = (e) => {
		this.setState({
			mouseLatLng: e.latLng,
		})
	}

	getOptions() {
		const { route, active, machineState } = this.props
		const { mouseOver } = this.state
		const [pins] = unwindEdges(route.pins)
		const path = route.pins ? getPathFromPins(pins) : []
		const stateString = getStateString(machineState.value)
		const clickable = !/Lesson.DropPin.DropMode/.test(stateString)
		return {
			path,
			strokeColor: 'hsl(5, 94%, 60%)',
			strokeOpacity: active || mouseOver ? 0.8 : 0.3,
			strokeWeight: active || mouseOver ? 6 : 4,
			clickable,
		}
	}

	eventHandlers: any

	render() {
		const options = this.getOptions()
		const { route } = this.props
		const { mouseLatLng, mouseOver } = this.state
		// { mouseOver && <RouteHoverPopup />}
		return (
			<React.Fragment>
				{mouseOver && mouseLatLng && <RouteHoverPopup position={mouseLatLng} route={route} />}
				<PolyLine events={this.eventHandlers} options={options} />
			</React.Fragment>
		)
	}
}

/**
 * Wrapper
 */

export const Route = (props: BaseProps) => (
	<MapConsumer>
		{(contextValue) => (
			<InspectorConsumer>
				{({ inspectItem }) => <RouteMain {...props} {...contextValue} inspectItem={inspectItem} />}
			</InspectorConsumer>
		)}
	</MapConsumer>
)
