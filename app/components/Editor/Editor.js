// @flow
import React from 'react'
import { compose } from 'recompose'
import * as R from 'ramda'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withStatechart } from 'react-automata'
import { withMapQuery, withCurrentViewerQuery } from 'Queries'
import type { ViewerType, MapType, NewPinType } from 'Types'
import Pin from './Elements/Pin'
import Debugger from './Debugger'
import { NewPinButton, ZoomButton, Toolbar } from './Tools'
import { statechart, SUCCESS, DROPPED_PIN, CANCEL } from './modes/statechart'
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
	inProgressPin?: void | NewPinType,
	subscribeToMorePins: (Function) => () => void,
	transition: (string, ?{}) => void,
	machineState: {
		value: string,
	},
	mapOptions: Object,
	updateMapOptions: (Object) => void,
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
		inProgressPin: null,
	}

	state = {
		log: [],
	}

	componentDidMount() {
		const { subscribeToMorePins } = this.props
		this.unsubscribe = subscribeToMorePins((newPin) => {
			this.log(`${newPin.owner.name} added pin ${newPin.title}`)
		})
	}

	componentWillUnmount() {
		this.unsubscribe()
	}

	onAddPinSuccess = () => {
		const { transition } = this.props
		transition(SUCCESS, {
			inProgressPin: null,
		})
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

	transition = (action: string) => (payload: {} = {}) => {
		this.props.transition(action, payload)
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
		console.log(eventName, mode)
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

	enterAddPinInfo() {
		this.setState(({ mapOptions }) => ({
			mapOptions: {
				...mapOptions,
				draggable: false,
				draggableCursor: 'cell',
			},
		}))
	}

	enterAddPin() {
		this.setState(({ mapOptions }) => ({
			mapOptions: {
				...mapOptions,
				draggable: true,
				draggableCursor: 'url("/images/newPin.svg") 18 49, crosshair',
				clickableIcons: true,
			},
		}))
	}

	enterNormal() {
		this.setState(({ mapOptions }) => ({
			mapOptions: {
				...mapOptions,
				draggable: true,
				draggableCursor: 'initial',
				clickableIcons: true,
			},
		}))
	}

	componentDidTransition(prevStateMachine, event) {
		this.handleEvent('onEntry')
		this.log(`transition: ${event}`)
	}

	unsubscribe: () => void

	render() {
		const { log } = this.state
		const { mapOptions, map, inProgressPin } = this.props
		console.log(this.props.mapOptions.zoom)
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
								<Pin key={p.uid} pin={p} updatePinSuccess={this.transition(SUCCESS)} updatePinCancel={this.transition(CANCEL)} />
							))}
							{inProgressPin ? (
								<Pin
									key="newPin"
									pin={inProgressPin}
									updatePinSuccess={this.transition(SUCCESS)}
									updatePinCancel={this.transition(CANCEL)}
								/>
							) : null}
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
	withModes,
	withMapOptions,
)(Editor)
