// @flow
import React from 'react'
import type { ProviderProps } from '../Provider'
import NewPinButton from './NewPinButton'
import ZoomButton from './ZoomButton'
import Toolbar from './Toolbar'
/**
 * Tools
 */

const Tools = (props: ProviderProps) => {
	const { zoomIn, zoomOut, setView, mapView } = props
	const onNewPinClick = () => {
		const newView = mapView === 'addPin' ? 'normal' : 'addPin'
		setView(newView)
	}

	return (
		<React.Fragment>
			<Toolbar>
				<NewPinButton onClick={onNewPinClick} />
			</Toolbar>
			<Toolbar align="right">
				<ZoomButton direction="in" onClick={() => zoomIn()} />
				<ZoomButton direction="out" onClick={() => zoomOut()} />
			</Toolbar>
		</React.Fragment>
	)
}

export default Tools
