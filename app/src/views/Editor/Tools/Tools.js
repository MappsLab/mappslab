// @flow
import React from 'react'
import { State } from 'react-automata'
import ToolTip from 'Components/ToolTip'
import type { ProviderProps } from '../Provider'
import NewPinButton from './NewPinButton'
import ZoomButton from './ZoomButton'
import Toolbar from './Toolbar'
/**
 * Tools
 */

const Tools = (props: ProviderProps) => {
	const { zoomIn, zoomOut, transition } = props
	const onNewPinClick = () => {
		transition('clickedDropPin')
	}

	return (
		<State is="Lesson*">
			<Toolbar>
				<ToolTip message="Add a New Pin">
					<NewPinButton onClick={onNewPinClick} />
				</ToolTip>
			</Toolbar>
			<Toolbar align="right">
				<ZoomButton direction="in" onClick={() => zoomIn()} />
				<ZoomButton direction="out" onClick={() => zoomOut()} />
			</Toolbar>
		</State>
	)
}

export default Tools
