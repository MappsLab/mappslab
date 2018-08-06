// @flow
import React from 'react'
import { compose } from 'recompose'
import * as R from 'ramda'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withStatechart } from 'react-automata'
import { withMapQuery, withCurrentViewerQuery } from 'Queries'
import type { ViewerType, MapType, NewPinType } from 'Types'
import Pin from './Pin'
import Debugger from './Debugger'
import { NewPinButton, ZoomButton, Toolbar } from './Tools'
import { statechart, SUCCESS, DROPPED_PIN, CANCEL, NEXT } from './modes/statechart'
import withMapOptions from './mapOptions'
import withModes from './modes'
// import { modes } from './modes/index'

const EditorWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`

/**
 * Editor
 */

export type EditorProps = {
	viewer: ViewerType,
	map: MapType,
	subscribeToMorePins: (Function) => () => void,
	transition: (string, ?{}) => void,
	machineState: {
		value: string,
	},
	mapOptions: Object,
	updateMapOptions: (Object) => void,
	activePinUid?: string | null,
}

export type EditorState = {
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

class Editor extends React.Component<EditorProps, EditorState> {
	static defaultProps = {
		activePinUid: null,
	}

	state = {
		log: [],
	}

	componentDidMount() {
		const { subscribeToMorePins } = this.props
		this.unsubscribe = subscribeToMorePins((newPin) => {
			this.log(`${newPin.owner.name} added pin ${newPin.title}`)
		})
		this.transition(NEXT)()
	}

	componentDidUpdate(prevProps) {
		// If we transitioned from one state to another,
		// trigger the onEntry event and log the transition
		if (prevProps.machineState.value !== this.props.machineState.value) {
			this.handleEvent('onEntry')()
			this.log(`transition to: ${this.props.machineState.value}`)
		}
	}

	componentWillUnmount() {
		// Cancel the subscription for new map data
		this.unsubscribe()
	}

	/**
	 * Map all handlers ('onClick', 'onDblClick', etc)
	 * to `this.handleEvent -> eventName`
	 */
	getMapEventHandlers = () =>
		eventNames.reduce(
			(acc, name) => ({
				...acc,
				[name]: this.handleEvent(name),
			}),
			{},
		)

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
		if (handler) handler(payload)
	}

	log = (message) => {
		const now = new Date()
		const newEntry = { timestamp: now.getTime(), message }
		this.setState((prevState) => ({
			log: [...prevState.log, newEntry],
		}))
	}

	unsubscribe: () => void

	render() {
		const { log } = this.state
		const { mapOptions, map, activePinUid } = this.props
		const { pins } = map
		return (
			<EditorWrapper>
				<Debugger log={log} />
				<Mapp
					APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
					eventHandlers={this.getMapEventHandlers()}
					options={mapOptions}
					render={() => (
						<React.Fragment>
							{pins.map((p) => (
								<Pin
									key={p.uid}
									pin={p}
									active={p.uid === activePinUid}
									updatePinSuccess={this.transition(SUCCESS)}
									updatePinCancel={this.transition(CANCEL)}
								/>
							))}
						</React.Fragment>
					)}
				/>
				<Toolbar>
					<NewPinButton onClick={this.transition(DROPPED_PIN)} />
				</Toolbar>
				<Toolbar align="right">
					<ZoomButton direction="in" onClick={this.props.zoom('in')} />
					<ZoomButton direction="out" onClick={this.props.zoom('out')} />
				</Toolbar>
			</EditorWrapper>
		)
	}
}

export default compose(
	withCurrentViewerQuery,
	withMapQuery,
	withStatechart(statechart),
	withMapOptions,
	withModes,
)(Editor)
