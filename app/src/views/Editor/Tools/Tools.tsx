import React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { State } from 'react-automata'
import { useCurrentMap } from '../../../providers/CurrentMap'
import NewPinButton from './NewPinButton'
import ZoomButton from './ZoomButton'
import Toolbar from './Toolbar'
import { LayersTool, DataLayerSelectorProps } from './LayersTool'

/**
 * Tools
 */

export interface ToolsProps extends DataLayerSelectorProps {}

export const Tools = (props: ToolsProps) => {
	const { zoomIn, zoomOut, transitionMode } = useCurrentMap()
	const { disableLayer, enableLayer, enabledLayers, layers } = props
	const onNewPinClick = () => {
		transitionMode({ type: 'clickedDropPin' })
	}

	return (
		<State is="Lesson*">
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
		</State>
	)
}
