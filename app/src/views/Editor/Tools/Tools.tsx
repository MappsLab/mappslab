import React from 'react'
import { useCurrentMap } from '../../../providers/CurrentMap'
import NewPinButton from './NewPinButton'
import ZoomButton from './ZoomButton'
import Toolbar from './Toolbar'
import { DataLayerSelectorProps, LayersTool } from './LayersTool'
import { SearchBox } from './SearchBox'

/**
 * Tools
 */

export type ToolsProps = DataLayerSelectorProps

export const Tools = (props: ToolsProps) => {
	const { zoomIn, zoomOut, mode, transitionMode } = useCurrentMap()
	const { disableLayer, enableLayer, enabledLayers, layers } = props

	const onNewPinClick = () => {
		transitionMode({ type: 'clickedDropPin' })
	}

	if (!mode.matches('Lesson')) return null

	return (
		<React.Fragment>
			<SearchBox />
			<Toolbar>
				<NewPinButton onClick={onNewPinClick} />
			</Toolbar>
			<LayersTool
				disableLayer={disableLayer}
				enableLayer={enableLayer}
				enabledLayers={enabledLayers}
				layers={layers}
			/>
			<Toolbar align="right">
				<ZoomButton direction="in" onClick={() => zoomIn()} />
				<ZoomButton direction="out" onClick={() => zoomOut()} />
			</Toolbar>
		</React.Fragment>
	)
}
