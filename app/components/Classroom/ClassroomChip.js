// @flow
import React from 'react'
import type { ClassroomType } from 'Types/Classroom'
import { Chip } from 'Components/Generic'

/**
 * ClassroomChip
 */

type Props = {
	size?: 'small' | 'large',
	classroom: ClassroomType,
	active?: boolean,
}

const ClassroomChip = ({ size, active, classroom }: Props) => (
	<Chip size={size || 'large'} active={active} title={classroom.title} />
)

ClassroomChip.defaultProps = {
	active: false,
	size: 'large',
}

export default ClassroomChip
