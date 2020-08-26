import React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Classroom } from '../../types-ts'
import { ChipProps, Chip } from '../Generic'

/**
 * ClassroomChip
 */

interface Props extends ChipProps {
	classroom: Classroom
}

const getTeacherNames = (classroom: Classroom): null | string => {
	const [teachers] = unwindEdges(classroom.teachers)
	const teacherNames = teachers ? teachers.map((t) => t.name).join(', ') : null
	return teacherNames
}

export const ClassroomChip = ({ size, active, classroom, ...rest }: Props) => (
	<Chip
		size={size || 'large'}
		active={active}
		subtitle={getTeacherNames(classroom)}
		{...rest}
		title={classroom.title || 'Untitled Classroom'}
	/>
)

