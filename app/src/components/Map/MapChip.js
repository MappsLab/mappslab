// @flow
import React from 'react'
import type { MapType } from 'Types/Map'
import { Chip } from 'Components/Generic'
import type { ChipProps } from 'Components/Generic/Chip'

/**
 * ClassroomChip
 */

type Props = ChipProps & {
	map: MapType,
}

const ClassroomChip = ({ size, active, map, ...rest }: Props) => (
	<Chip size={size || 'large'} active={active} title={map.title} {...rest} />
)

export default ClassroomChip
