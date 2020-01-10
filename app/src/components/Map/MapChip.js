// @flow
import React from 'react'
import type { MapType } from 'Types/Map'
import { Chip } from 'Components/Generic'
import type { ChipProps } from 'Components/Generic/Chip'

/**
 * MapChip
 */

type Props = ChipProps & {
	map: MapType,
}

const MapChip = ({ size, active, map, ...rest }: Props) => (
	<Chip
		size={size || 'large'}
		active={active}
		title={map.title}
		subtitle={map.classroom && map.classroom.title}
		{...rest}
	/>
)

export default MapChip
