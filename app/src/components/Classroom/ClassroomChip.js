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

const getTeacherNames = (classroom: ClassroomType): null | string => {
	const teachers = classroom.teachers && classroom.teachers.map((t) => t.name).join(',')
	return teachers || null
}

const ClassroomChip = ({ size, active, classroom, ...rest }: Props) => (
	<Chip size={size || 'large'} active={active} title={classroom.title} subtitle={getTeacherNames(classroom)} {...rest} />
)

export default ClassroomChip
