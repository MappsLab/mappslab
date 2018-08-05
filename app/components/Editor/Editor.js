// @flow
import React from 'react'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withStatechart } from 'react-automata'
import { withMapQuery, withCurrentViewerQuery } from 'Queries'
import type { ViewerType, MapType, PinType } from 'Types'
import { minMax } from 'Utils/data'
import Pin from './Elements/Pin'
import Debugger from './Debugger'
import { NewPinButton, ZoomButton, Toolbar } from './Tools'
import NewPin from './Elements/NewPin'
import { statechart, STARTED_ADD_PIN, SUCCESS } from './modes/statechart'
import { modes } from './modes/modes'

const EditorWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`

/**
 * Editor
 */

type Props = {
	viewer: ViewerType,
	map: MapType,
	inProgressPin?: void | PinType,
	subscribeToMorePins: (Function) => () => void,
	transition: (string, ?{}) => void,
	machineState: {
		value: string,
	},
}

type EditorState = {
	mapOptions: Object,
	log: Array<{ timestamp: number, message: string }>,
}

const defaultOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

class Editor extends React.Component<Props, EditorState> {
	/**
	 * Add different methods depending on the mode
	 * mode.addPin.handleClick(...) etc
	 */
	// $FlowFixMe
	modes = Object.entries(modes).reduce(
		(acc, [title, mode]: [string, Function]) => ({
			[title]: mode(this),
			...acc,
		}),
		{},
	)

	static defaultProps = {
		inProgressPin: null,
	}

	state = {
		log: [],
		mapOptions: defaultOptions,
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

	log = (message) => {
		const now = new Date()
		const newEntry = { timestamp: now.getTime(), message }
		this.setState((prevState) => ({
			log: [...prevState.log, newEntry],
		}))
	}

	toggleAddPinMode = () => {
		const { transition } = this.props
		transition(STARTED_ADD_PIN)
	}

	handleMapClick = (e) => {
		const {
			machineState: { value },
		} = this.props
		const mode = value
		if (this.modes[mode].handleClick) this.modes[mode].handleClick(e)
	}

	componentDidTransition(prevStateMachine, event) {
		this.log(`transition: ${event}`)
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

	zoom = (level: 'in' | 'out' | number) => () => {
		this.setState(({ mapOptions }) => {
			const zoom = minMax(0, 21)(
				typeof level === 'number'
					? level
					: level === 'in'
						? mapOptions.zoom + 1
						: level === 'out'
							? mapOptions.zoom - 1
							: defaultOptions.zoom,
			)
			return {
				mapOptions: {
					zoom,
				},
			}
		})
	}

	unsubscribe: () => void

	render() {
		const { mapOptions, log } = this.state
		const { map, inProgressPin } = this.props
		const { pins, uid } = map
		return (
			<EditorWrapper>
				<Debugger log={log} />
				<Mapp
					APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
					onClick={this.handleMapClick}
					{...mapOptions}
					render={() => (
						<React.Fragment>
							{pins.map((p) => <Pin key={p.uid} {...p} />)}
							{inProgressPin ? (
								<NewPin key="newPin" mapUid={uid} onSuccess={this.onAddPinSuccess} newPin={inProgressPin} />
							) : null}
						</React.Fragment>
					)}
				/>
				<Toolbar>
					<NewPinButton onClick={this.toggleAddPinMode} />
				</Toolbar>
				<Toolbar align="right">
					<ZoomButton direction="in" onClick={this.zoom('in')} />
					<ZoomButton direction="out" onClick={this.zoom('out')} />
				</Toolbar>
			</EditorWrapper>
		)
	}
}

export default withCurrentViewerQuery(withMapQuery(withStatechart(statechart)(Editor)))
