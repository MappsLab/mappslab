// @flow
import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
// import type { Map as GoogleMap } from 'mapp/types'
import { withMapQuery, withCurrentViewerQuery } from 'Queries'
import type { MapType, PinType, ViewerType } from 'Types'
import { withStatechart } from 'react-automata'
import { compose } from 'Utils/data'
import Debugger from './Debugger'
import Pin from './Pin'
import { NewPinButton, ZoomButton, Toolbar } from './Tools'
import { statechart, SUCCESS, DROPPED_PIN, CANCEL, NEXT } from './statechart'
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
		value: string,
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
	log: Array<{ timestamp: number, message: string }>,
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
		this.transition(NEXT)()
	}

	componentDidUpdate(prevProps) {
		/** TODO: Forward react-automata's ref so we can use componentDidTransition */
		// If we transitioned from one state to another,
		// trigger the onEntry event and log the transition
		if (prevProps.machineState.value !== this.props.machineState.value) {
			this.handleEvent('onEntry')()
			this.log(`transition to: ${this.props.machineState.value}`)
		}
	}

	componentWillUnmount() {
		const { removeEventListeners } = this.props
		removeEventListeners(this.listeners)
	}

	log = (message) => {
		const now = new Date()
		const newEntry = { timestamp: now.getTime(), message }
		this.setState((prevState) => ({
			log: [...prevState.log, newEntry],
		}))
	}

	/**
	 * Factory function to create smart handlers for each type of event.
	 * If the current mode has a handler for this event,
	 * this will call it with the (optional) payload.
	 *
	 * See ./modes for the handlers for each mode.
	 */
	handleEvent = (eventName: Event) => (payload) => {
		const mode = this.props.machineState.value
		const handler = R.path(['props', 'modes', mode, eventName])(this)
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
		this.transition(SUCCESS)({ activePinUid: null, inProgressPin: null })
	}

	updatePinCancel = () => {}

	render() {
		const { map, activePinUid, inProgressPin, viewer } = this.props
		const { pins } = map
		const mode = this.props.machineState.value
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
					<NewPinButton onClick={this.transition(DROPPED_PIN)} />
				</Toolbar>
				<Toolbar align="right">
					<ZoomButton direction="in" onClick={() => {}} />
					<ZoomButton direction="out" onClick={() => {}} />
				</Toolbar>
			</EditorWrapper>
		)
	}
}

export default compose(
	withCurrentViewerQuery,
	withMapQuery,
	withStatechart(statechart),
	withEditorModes,
)(MapEditor)
