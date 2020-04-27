import React from 'react'
import { Map } from '../../types-ts'
import { Chip, ChipProps } from '../Generic'

/**
 * MapChip
 */

type Props = ChipProps & {
	map: Map
}

export const MapChip = ({ size, active, map, ...rest }: Props) => (
	<Chip
		size={size || 'large'}
		active={active}
		title={map.title}
		subtitle={map.classroom && map.classroom.title}
		{...rest}
	/>
)
