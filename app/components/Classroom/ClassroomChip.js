// @flow
import React from 'react'
import type { ClassroomType } from 'Types/Classroom'
import { Chip } from 'Components/Generic'
import type { ChipProps } from 'Components/Generic/Chip'

/**
 * ClassroomChip
 */

type Props = ChipProps & {
	classroom: ClassroomType,
}

const ClassroomChip = ({ size, active, classroom, ...rest }: Props) => (
	<Chip size={size || 'large'} active={active} title={classroom.title} {...rest} />
)

export default ClassroomChip
