import * as React from 'react'
import { Header5 } from '../../../../components/Text'
import { useCurrentMap } from '../../../../providers/CurrentMap'
import { Option } from './Option'

export interface MapBaseSelectorProps {}

const mapTypesRegex = /roadmap|terrain|satellite|hybrid/

export const MapBaseSelector = () => {
	const { mapType, setMapType } = useCurrentMap()
	const setType = (type: string) => () => setMapType(type)
	if (!mapTypesRegex.test(mapType)) return null

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
