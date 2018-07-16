// @flow
import React from 'react'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withStatechart } from 'react-automata'
import { withMapQuery, withCurrentViewerQuery } from 'Queries'
import type { ViewerType, MapType, PinType } from 'Types'
import Pin from './Elements/Pin'
import Debugger from './Debugger'
import Toolbar from './Tools/Toolbar'
import NewPinButton from './Tools/NewPinButton'
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
	inProgressPin: void | PinType,
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
	static defaultProps = {
		inProgressPin: null,
	}

	state = {
		log: [],
		mapOptions: defaultOptions,
	}

	componentDidMount() {
		this.unsubscribe = this.props.subscribeToMorePins((newPin) => {
			this.log(`${newPin.owner.name} added pin ${newPin.title}`)
		})
	}

	componentWillUnmount() {
		this.unsubscribe()
	}

	onAddPinSuccess = () => {
		this.props.transition(SUCCESS, {
			inProgressPin: null,
		})
	}

	unsubscribe: () => void

	log = (message) => {
		const now = new Date()
		const newEntry = { timestamp: now.getTime(), message }
		this.setState((prevState) => ({
			log: [...prevState.log, newEntry],
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

	enterAddPinInfo() {
		this.setState(({ mapOptions }) => ({
			mapOptions: {
				...mapOptions,
				draggable: false,
				draggableCursor: 'cell',
			},
		}))
	}

	componentDidTransition(prevStateMachine, event) {
		this.log(`transition: ${event}`)
	}

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

	toggleAddPinMode = () => {
		this.props.transition(STARTED_ADD_PIN)
	}

	handleMapClick = (e) => {
		const mode = this.props.machineState.value
		if (this.modes[mode].handleClick) this.modes[mode].handleClick(e)
	}

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
			</EditorWrapper>
		)
	}
}

export default withCurrentViewerQuery(withMapQuery(withStatechart(statechart)(Editor)))
