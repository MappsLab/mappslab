import * as React from 'react'
import { DataLayerSelectorProps, DataLayerSelector } from './DataLayerSelector'
import { MapBaseSelectorProps, MapBaseSelector } from './MapBaseSelector'
import { LayersToolPane } from './styled'

interface LayersToolProps extends DataLayerSelectorProps, MapBaseSelectorProps {
	/* */
}

const mapTypesRegex = /roadmap|terrain|satellite|hybrid/

export const LayersTool = ({
	disableLayer,
	enableLayer,
	enabledLayers,
	layers,
	setMapType,
	mapType,
}: LayersToolProps) => {
	return (
		<LayersToolPane>
			<DataLayerSelector
				disableLayer={disableLayer}
				enableLayer={enableLayer}
				enabledLayers={enabledLayers}
				layers={layers}
			/>
			{mapTypesRegex.test(mapType) ? (
				<MapBaseSelector mapType={mapType} setMapType={setMapType} />
			) : null}
		</LayersToolPane>
	)
}
