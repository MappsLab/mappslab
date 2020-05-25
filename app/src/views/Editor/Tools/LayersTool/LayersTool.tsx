import * as React from 'react'
import { DataLayerSelectorProps, DataLayerSelector } from './DataLayerSelector'
import { MapBaseSelectorProps, MapBaseSelector } from './MapBaseSelector'
import { LayersToolPane } from './styled'

interface LayersToolProps extends DataLayerSelectorProps, MapBaseSelectorProps {
	/* */
}
// TODO: Move layers to Map Provider

export const LayersTool = ({
	disableLayer,
	enableLayer,
	enabledLayers,
	layers,
}: LayersToolProps) => {
	return (
		<LayersToolPane>
			<DataLayerSelector
				disableLayer={disableLayer}
				enableLayer={enableLayer}
				enabledLayers={enabledLayers}
				layers={layers}
			/>
			<MapBaseSelector />
		</LayersToolPane>
	)
}
