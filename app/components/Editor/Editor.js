// @flow
import React from 'react'
import styled from 'styled-components'
import Mapp from 'mapp'
import { withMapQuery, withCurrentViewerQuery } from 'App/queries'
import type { ViewerType, MapType } from 'App/types'
import Pin from './Elements/Pin'
import Debugger from './Debugger'
import Toolbar from './Tools/Toolbar'
import NewPinButton from './Tools/NewPinButton'

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

type Mode = ADD_PIN | NORMAL

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
		const { mode } = this.state
		const draggableCursor = mode === ADD_PIN ? 'cell' : 'auto'
		const draggable = mode === NORMAL
		return { ...defaultOptions, ...this.state, draggableCursor, draggable }
	}

	toggleAddPinMode = () => {
		this.setState(({ mode }) => (mode === ADD_PIN ? { mode: NORMAL } : { mode: ADD_PIN }))
	}

	handleClick = (e) => {
		const { lat, lng } = e.latLng
		console.log(lat())
		console.log(lng())
		this.setState({
			center: {
				lat: lat(),
				lng: lng(),
			},
			mode: NORMAL,
		})
	}

	render() {
		const { pins } = this.props.map
		const { mode } = this.state
		const contextValue = {
			mode,
		}
		const options = this.getMapOptions()

		return (
			<EditorContext.Provider value={contextValue}>
				<EditorWrapper>
					<Debugger {...this.props} {...this.state} something={false} />
					<Mapp
						APIKey="AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag"
						render={() => <React.Fragment>{pins.slice(0, 1).map((p) => <Pin key={p.uid} {...p} />)}</React.Fragment>}
						onClick={this.handleClick}
						{...options}
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

export default withCurrentViewerQuery(withMapQuery(Editor))
