// @flow
import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
// import type { Map as GoogleMap } from 'mapp/types'
import { withMapQuery, CurrentViewerQuery } from 'Queries'
import type { MapType, PinType, ViewerType, MachineValue } from 'Types'
import { withStateMachine } from 'react-automata'
import { compose, getStateString } from 'Utils/data'
import Debugger from './Debugger'
import Pin from './Pin'
import { NewPinButton, ZoomButton, Toolbar } from './Tools'
import { statechart, transitions } from './statechart'
import withEditorModes from './editorModes'

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
	subscribeToMorePins: (Function) => () => void,
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
		const { addEventListeners, subscribeToMorePins } = this.props
		this.listeners = eventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)
		this.unsubscribe = subscribeToMorePins((newPin) => {
			this.log(`${newPin.owner.name} added pin ${newPin.title}`)
		})
		addEventListeners(this.listeners)
		this.transition(transitions.NEXT)()
	}

	componentDidUpdate(prevProps) {
		/** TODO: Forward react-automata's ref so we can use componentDidTransition */
		// If we transitioned from one state to another,
		// trigger the onEntry event and log the transition
		if (prevProps.machineState.value !== this.props.machineState.value) {
			this.handleEvent('onEntry')()
			this.log(`transition to: ${this.getMode()}`)
		}
	}

	componentWillUnmount() {
		const { removeEventListeners } = this.props
		removeEventListeners(this.listeners)
	}

	log = (message) => {
		const timestamp = new Date()
		const newEntry = { timestamp, message }
		this.setState((prevState) => ({
			log: [...prevState.log, newEntry],
		}))
	}

	getMode = (value: MachineValue = this.props.machineState.value): string => {
		return getStateString(value)
	}

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 * See ./modes for the handlers for each mode.
	 */
	handleEvent = (eventName: Event) => (payload) => {
		const modePath = this.getMode().split('.')
		const handler = R.path(['props', 'modes', ...modePath, eventName])(this)
		if (handler) handler(this.props)(payload)
	}

	/**
	 * Factory function to make shortcuts for transitions called by child
	 * components.
	 *
	 * TODO: this gets weird with events, which is why `withProps` is defined as a property.
	 * Think about a
	 */
	transition = (action: string) => (payload: SyntheticEvent<> | void | {}) => {
		// do some duck typing to prevent passing a syntheticEvent in as updated props.
		const newValues = payload && payload.nativeEvent ? {} : payload
		this.props.transition(action, newValues)
	}

	updatePinSuccess = () => {
		this.transition(transitions.SUCCESS)({ activePinUid: null, inProgressPin: null })
	}

	updatePinCancel = () => {}

	/* Method Types */
	unsubscribe: () => void

	render() {
		const { map, activePinUid, inProgressPin, viewer } = this.props
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
					<NewPinButton onClick={this.transition(transitions.ENTER_DROP_PIN)} />
				</Toolbar>
				<Toolbar align="right">
					<ZoomButton direction="in" onClick={() => {}} />
					<ZoomButton direction="out" onClick={() => {}} />
				</Toolbar>
			</EditorWrapper>
		)
	}
}

const Wrapper = compose(
	withMapQuery,
	withStateMachine(statechart),
	withEditorModes,
)(MapEditor)

export default () => <CurrentViewerQuery>{({ data }) => <Wrapper viewer={data.viewer} />}</CurrentViewerQuery>
