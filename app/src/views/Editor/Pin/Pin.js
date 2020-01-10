// @flow
import React from 'react'
import { Marker, CustomPopup, markerEventNames } from 'mapp'
import type { PinType } from 'Types/Pin'
import { getStateString } from 'Utils/data'
import { InspectorConsumer } from '../ItemInspector'
import type { ItemInspectorProviderProps } from '../ItemInspector'
import { MapConsumer } from '../Provider'
import type { ProviderProps } from '../Provider'
import PinHoverPopup from './PinHoverPopup'

/**
 * Pin
 */

type BaseProps = {
	pin: PinType,
}

export type PinProps = BaseProps &
	ProviderProps & {
		isInspected: boolean,
		inspectItem: $PropertyType<ItemInspectorProviderProps, 'inspectItem'>,
	}

export type PinState = {
	mouseOver: boolean,
}

class Pin extends React.Component<PinProps, PinState> {
	constructor(props) {
		super(props)
		this.eventHandlers = markerEventNames.reduce(
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
		}
	}

	componentWillReceiveProps(nextProps: PinProps) {
		const currentStateString = getStateString(this.props.machineState.value)
		const nextStateString = getStateString(nextProps.machineState.value)

		if (currentStateString !== nextStateString)
			this.setState({ mouseOver: false })
	}

	onClick = () => {
		const { pin, inspectItem, machineState, transition } = this.props
		const stateString = getStateString(machineState.value)
		/* If dropping a pin */
		if (stateString === 'Lesson.DropPin.DropMode.Drop') {
			const position = pin.route && pin.route.isFirst ? 'BEFORE' : 'AFTER'
			transition('enterConnect', { connectToPin: { pin, position } })
		} else {
			this.setState({ mouseOver: false })
			const position = {
				lat: pin.lat,
				lng: pin.lng,
			}
			inspectItem(pin, position)
		}
	}

	onMouseOver = (e) => {
		this.setState({ mouseOver: true })
	}

	onMouseOut = () => {
		this.setState({ mouseOver: false })
	}

	eventHandlers: any

	isClickable(): boolean {
		const { machineState, viewer, pin } = this.props
		const { route } = pin
		const stateString = getStateString(machineState.value)
		if (stateString === 'Lesson.DropPin.DropMode.Connect') return false
		if (stateString === 'Lesson.DropPin.DropMode.Drop') {
			if (!viewer) return false
			if (pin.owner.uid !== viewer.uid) return false
			if (route && (!route.isFirst && !route.isLast)) return false
		}
		return true
	}

	render() {
		const { pin, isInspected } = this.props
		const { mouseOver } = this.state
		const { lat, lng } = pin
		// const isInspected = inspectedItem && inspectedItem.uid === pin.uid
		const enabled = this.isClickable()
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
							{!isInspected && enabled && mouseOver ? (
								<CustomPopup position={anchor.position}>
									<PinHoverPopup pin={pin} />
								</CustomPopup>
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
			<InspectorConsumer>
				{({ inspectItem, item: inspectedItem }) => (
					/* $FlowFixMe */
					<Pin
						pin={pin}
						inspectItem={inspectItem}
						isInspected={Boolean(
							inspectedItem && pin.uid === inspectedItem.uid,
						)}
						{...contextValue}
					/>
				)}
			</InspectorConsumer>
		)}
	</MapConsumer>
)

export default Wrapper
