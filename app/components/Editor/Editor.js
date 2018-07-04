// @flow
import React from 'react'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withStatechart } from 'react-automata'
import { withMapQuery, withCurrentViewerQuery, withPinAddedToMapSubscription } from 'App/queries'
import type { ViewerType, MapType } from 'App/types'
import Pin from './Elements/Pin'
import Debugger from './Debugger'
import Toolbar from './Tools/Toolbar'
import NewPinButton from './Tools/NewPinButton'
import NewPin from './Elements/NewPin'
import { statechart, STARTED_ADD_PIN, SUCCESS } from './modes/statechart'
import { modes } from './modes/modes'

const EditorContext = React.createContext('editor')

const ADD_PIN = 'addPin'
const NORMAL = 'normal'

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
}

type State = {
	mode: Mode,
}

const defaultOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 10,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
}

class Editor extends React.Component<Props, State> {
	state = {
		mode: NORMAL,
	}

	setMode = (mode: Mode) => () => {
		this.setState({ mode })
	}

	getMapOptions = () => {
		const mode = this.props.machineState.value
		const draggableCursor = mode === ADD_PIN ? 'cell' : 'auto'
		const draggable = mode === NORMAL
		return { ...defaultOptions, ...this.props, draggableCursor, draggable }
	}

	modes = Object.entries(modes).reduce(
		(acc, [title, mode]) => ({
			[title]: mode(this),
			...acc,
		}),
		{},
	)

	toggleAddPinMode = () => {
		this.props.transition(STARTED_ADD_PIN)
	}

	onAddPinSuccess = (pin: PinType) => {
		this.props.transition(SUCCESS, { newPin: null })
	}

	handleMapClick = (e) => {
		const mode = this.props.machineState.value
		if (this.modes[mode].handleClick) this.modes[mode].handleClick(e)
	}

	render() {
		const { pins } = this.props.map
		const { newPin, uid } = this.props
		const mode = this.props.machineState.value
		const contextValue = {
			mode,
		}
		const options = this.getMapOptions()

		return (
			<EditorContext.Provider value={contextValue}>
				<EditorWrapper>
					<Debugger mode={mode} />
					<Mapp
						APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
						onClick={this.handleMapClick}
						{...options}
						render={() => (
							<React.Fragment>
								{pins.map((p) => <Pin key={p.uid} {...p} />)}
								{newPin ? <NewPin key="newPin" mapUid={uid} onSuccess={this.onAddPinSuccess} newPin={newPin} /> : null}
							</React.Fragment>
						)}
					/>
					<Toolbar>
						<NewPinButton onClick={this.toggleAddPinMode} active={mode === ADD_PIN} />
					</Toolbar>
				</EditorWrapper>
			</EditorContext.Provider>
		)
	}
}

export const EditorConsumer = EditorContext.Consumer

export default withCurrentViewerQuery(withMapQuery(withPinAddedToMapSubscription(withStatechart(statechart)(Editor))))
