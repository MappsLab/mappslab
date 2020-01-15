import * as React from 'react'
import { DataLayer } from '../../../../types-ts'
import { Header5 } from '../../../../components/Text'
import { Option } from './Option'

export interface DataLayerSelectorProps {
	disableLayer: (id: string) => void
	enableLayer: (id: string) => void
	enabledLayers: string[]
	layers: DataLayer[]
}

export const DataLayerSelector = (props: DataLayerSelectorProps) => {
	const { enableLayer, layers, enabledLayers, disableLayer } = props
	const validLayers = layers.filter((l) => /\.kml$/.test(l.uri))

	const toggle = (uid: string) => () => {
		if (enabledLayers.includes(uid)) {
			disableLayer(uid)
		} else {
			enableLayer(uid)
		}
	}

	return (
		<>
			<Header5 align="center" color="gray">
				Layers
			</Header5>
			<hr />
			{validLayers.map((layer) => (
				<Option
					key={layer.uid}
					onClick={toggle(layer.uid)}
					enabled={enabledLayers.includes(layer.uid)}
					label={layer.title}
				/>
			))}
		</>
	)
}
