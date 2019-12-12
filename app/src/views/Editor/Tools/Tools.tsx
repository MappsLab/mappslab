// @flow
import React from 'react'
import { State } from 'react-automata'
import { ProviderProps } from '../Provider'
import NewPinButton from './NewPinButton'
import ZoomButton from './ZoomButton'
import Toolbar from './Toolbar'
import { DataLayerSelector } from './DataLayerSelector'

/**
 * Tools
 */

export interface ToolsProps extends ProviderProps {
	disableLayer: (id: string) => void
	enableLayer: (id: string) => void
	enabledLayers: string[]
}

const Tools = (props: ToolsProps) => {
	const { zoomIn, zoomOut, transition } = props
	const onNewPinClick = () => {
		transition('clickedDropPin')
	}

	return (
		<State is="Lesson*">
			<Toolbar>
				<NewPinButton onClick={onNewPinClick} />
			</Toolbar>
			<DataLayerSelector {...props} />
			<Toolbar align="right">
				<ZoomButton direction="in" onClick={() => zoomIn()} />
				<ZoomButton direction="out" onClick={() => zoomOut()} />
			</Toolbar>
		</State>
	)
}

export default Tools
