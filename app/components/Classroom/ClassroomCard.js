// @flow
import React from 'react'
import { Card } from 'Components/Generic'
import type { ClassroomType } from 'Types/Classroom'

/**
 * ClassroomCard
 */

type Props = {
	display?: 'list' | 'full',
	classroom: ClassroomType,
}

const ClassroomCard = ({ display, classroom }: Props) => (
	<Card display={display} header={classroom.title} subheader={classroom.teachers.map((t) => t.name).join(', ')} />
)

ClassroomCard.defaultProps = {
	display: 'list',
}

export default ClassroomCard
