import * as React from 'react'
import { Header5 } from '../../../../components/Text'
import { ProviderProps } from '../../Provider'
import { Option } from './Option'

export interface MapBaseSelectorProps {
	/* */
	setMapType: ProviderProps['setMapType']
	mapType: ProviderProps['mapType']
}

export const MapBaseSelector = ({
	setMapType,
	mapType,
}: MapBaseSelectorProps) => {
	const setType = (type: string) => () => setMapType(type)

	return (
		<>
			<Header5 align="center" color="gray">
				Map Base
			</Header5>
			<Option
				label="Road"
				onClick={setType('roadmap')}
				enabled={mapType === 'roadmap'}
			/>
			<Option
				label="Satellite"
				onClick={setType('satellite')}
				enabled={mapType === 'satellite'}
			/>
			<Option
				label="Hybrid"
				onClick={setType('hybrid')}
				enabled={mapType === 'hybrid'}
			/>
			<Option
				label="Terrain"
				onClick={setType('terrain')}
				enabled={mapType === 'terrain'}
			/>
		</>
	)
}
