// @flow
import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import type { MappRenderProps } from 'mapp/types'
import type { MapType, PinType, ViewerType, MachineValue } from 'Types'
import type { Subscription, SubscriptionConfig } from 'Types/GraphQL'
// import type { Map as GoogleMap } from 'mapp/types'
import { CurrentViewerQuery } from 'Queries'
import { pinAddedToMap, pinDeleted, pinUpdated } from 'Queries/Map/mapSubscriptions'
import { MapQuery } from 'Queries/Map'
import { startSubscription } from 'Queries/startSubscription'
import { withStateMachine } from 'react-automata'
import { compose, getStateString } from 'Utils/data'
import Debugger from './Debugger'
import Pin from './Pin'
import { NewPinButton, ZoomButton, Toolbar } from './Tools'
import { statechart, transitions } from './statechart'
import withEditorModes from './editorModes'

const debug = require('debug')('app')

/**
 * MapEditor
 */

const EditorWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	pointer-events: none;

	& > * {
		pointer-events: initial;
	}
`

type Props = {
	// googleMap: GoogleMap,
	map: MapType,
	machineState: {
		value: string | MachineValue,
	},
	// subscribeToMore returns a function that can be called to stop the subscription
	subscribeToMore: (SubscriptionConfig) => () => void,
	transition: (string, ?{}) => void,
	viewer: ViewerType,
	activePinUid?: string | null,
	inProgressPin?: null | PinType,
	addEventListeners: ({}) => void,
	removeEventListeners: ({}) => void,
}

type State = {
	log: Array<{ timestamp: Date, message: string }>,
}

// Make an object for the sake of flow
const _eventNames = {
	onClick: '',
	onDblClick: '',
	onEntry: '',
}

const eventNames = Object.keys(_eventNames)

type Event = $Keys<typeof _eventNames>

class MapEditor extends React.Component<Props, State> {
	listeners: {} = {}

	mapContainer = React.createRef()

	static defaultProps = {
		activePinUid: null,
		inProgressPin: null,
	}

	state = {
		log: [],
	}

	componentDidMount = async () => {
		this.addEventListeners()
		this.startSubscriptions()
		this.transition(transitions.NEXT)
	}

	componentDidUpdate(prevProps) {
		/** TODO: Forward react-automata's ref so we can use componentDidTransition */
		// If we transitioned from one state to another,
		// trigger the onEntry event and log the transition
		if (prevProps.machineState.value !== this.props.machineState.value) {
			this.handleEvent('onEntry')()
			debug(`[mode]: ${this.getMode()}`)
			this.log(`transition to: ${this.getMode()}`)
		}
	}

	componentWillUnmount() {
		const { removeEventListeners } = this.props
		removeEventListeners(this.listeners)
		this.stopSubscriptions()
	}

	log = (message) => {
		const timestamp = new Date()
		const newEntry = { timestamp, message }
		this.setState((prevState) => ({
			log: [...prevState.log, newEntry],
		}))
	}

	logSubscriptionUpdate = (subscriptionName: string) => (prev, newData) => {
		const pin = newData
		const {
			title,
			owner: { name },
		} = pin
		const verb =
			subscriptionName === 'pinAddedToMap'
				? 'added'
				: subscriptionName === 'pinUpdated'
					? 'updated'
					: subscriptionName === 'pinDeleted'
						? 'deleted'
						: '???'
		const message = `[${subscriptionName}]: ${name} ${verb} pin ${title}`
		this.log(message)
	}

	getMode = (value: MachineValue = this.props.machineState.value): string => getStateString(value)

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 * See ./modes for the handlers for each mode.
	 */
	handleEvent = (eventName: Event) => (payload) => {
		const mode = this.getMode()
		const modePath = mode.split('.')
		const handler = R.path(['props', 'modes', ...modePath, eventName])(this)
		debug(`[event]: ${eventName}, ${mode}, ${Boolean(handler).toString()}`)
		if (handler) handler(this.props)(payload)
	}

	/**
	 * Factory function to make shortcuts for transitions called by child
	 * components.
	 *
	 * TODO: this gets weird with events, which is why `withProps` is defined as a property.
	 */

	createTransition = (action: string) => (payload: SyntheticEvent<> | void | {}) => {
		this.transition(action, payload)
	}

	transition = (action: string, payload: SyntheticEvent<> | void | {}) => {
		// do some duck typing to prevent passing a syntheticEvent in as updated props.
		const newValues = payload && payload.nativeEvent ? {} : payload
		debug(`[transition] -> ${action}`, newValues)
		this.props.transition(action, newValues)
	}

	updatePinSuccess = () => {
		this.transition(transitions.SUCCESS, { activePinUid: null, inProgressPin: null })
	}

	updatePinCancel = () => {}

	subscriptions: Array<Subscription>

	addEventListeners() {
		const { addEventListeners } = this.props
		this.listeners = eventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)
		addEventListeners(this.listeners)
	}

	startSubscriptions() {
		const { subscribeToMore, map } = this.props
		// const subscriptions = [pinAddedToMap, pinDeleted, pinUpdated]
		const subscriptions = [pinAddedToMap, pinUpdated, pinDeleted]

		this.subscriptions = subscriptions.map((s) =>
			startSubscription({
				subscribeToMore,
				variables: { mapUid: map.uid },
				callback: this.logSubscriptionUpdate(s.name),
				...s,
			}),
		)
	}

	stopSubscriptions() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe()
		})
	}

	/* Method Types */
	unsubscribe: () => void

	render() {
		console.log(':)')
		console.log(this.props)
		const { map, activePinUid, inProgressPin, viewer, utils } = this.props
		const { zoomIn, zoomOut } = utils
		const { pins } = map
		const mode = this.getMode()
		return (
			<EditorWrapper>
				<Debugger log={this.state.log} />
				<React.Fragment>
					{pins.map((p) => (
						<Pin
							key={p.uid}
							pin={p}
							mapUid={map.uid}
							active={p.uid === activePinUid}
							updatePinSuccess={this.updatePinSuccess}
							updatePinCancel={this.updatePinCancel}
							transition={this.transition}
							mode={mode}
							viewer={viewer}
						/>
					))}
					{inProgressPin && (
						<Pin
							key={inProgressPin.uid}
							pin={inProgressPin}
							active={inProgressPin.uid === activePinUid}
							mapUid={map.uid}
							updatePinSuccess={this.updatePinSuccess}
							updatePinCancel={this.updatePinCancel}
							transition={this.transition}
							mode={mode}
							viewer={viewer}
						/>
					)}
				</React.Fragment>
				<Toolbar>
					<NewPinButton onClick={this.createTransition(transitions.ENTER_DROP_PIN)} />
				</Toolbar>
				<Toolbar align="right">
					<ZoomButton direction="in" onClick={zoomIn} />
					<ZoomButton direction="out" onClick={zoomOut} />
				</Toolbar>
			</EditorWrapper>
		)
	}
}

/**
 * Wrapper
 */

const Wrapper = compose(
	// withStateMachine(statechart),
	withEditorModes,
)(MapEditor)

type WrapperProps = {
	mapUid: string,
	map: MappRenderProps,
}

export default ({ mapUid, map }: WrapperProps) => (
	<CurrentViewerQuery>
		{({ data: viewerQueryData }) => (
			<MapQuery variables={{ uid: mapUid }}>
				{({ data: mapQueryData }) => {
					return <Wrapper viewer={viewerQueryData.currentViewer.viewer} mapData={mapQueryData.map} />
				}}
			</MapQuery>
		)}
	</CurrentViewerQuery>
)
