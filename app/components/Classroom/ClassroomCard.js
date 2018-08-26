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
	active: boolean,
}

const ClassroomCard = ({ active, display, classroom }: Props) => (
	<Card active={active} display={display} header={classroom.title} subheader={classroom.teachers.map((t) => t.name).join(', ')} />
)

ClassroomCard.defaultProps = {
	display: 'list',
}

export default ClassroomCard
