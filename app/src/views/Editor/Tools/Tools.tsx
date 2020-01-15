// @flow
import React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { State } from 'react-automata'
import { ProviderProps } from '../Provider'
import NewPinButton from './NewPinButton'
import ZoomButton from './ZoomButton'
import Toolbar from './Toolbar'
import { LayersTool, DataLayerSelectorProps } from './LayersTool'

/**
 * Tools
 */

export interface ToolsProps extends ProviderProps, DataLayerSelectorProps {}

const Tools = (props: ToolsProps) => {
	const {
		zoomIn,
		zoomOut,
		transition,
		disableLayer,
		enableLayer,
		enabledLayers,
		layers,
		setMapType,
		mapType,
	} = props
	const onNewPinClick = () => {
		transition('clickedDropPin')
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
				setMapType={setMapType}
				mapType={mapType}
			/>
			<Toolbar align="right">
				<ZoomButton direction="in" onClick={() => zoomIn()} />
				<ZoomButton direction="out" onClick={() => zoomOut()} />
			</Toolbar>
		</State>
	)
}

export default Tools
