// @flow
import React from 'react'
import { Card } from 'Components/Generic'
import type { ClassroomType } from 'Types/Classroom'

/**
 * ClassroomCard
 */

type Props = {
	onClick?: (any) => void | null,
	linkTo?: string | null,
	display?: 'list' | 'full',
	classroom: ClassroomType,
}

const ClassroomCard = ({ display, classroom, onClick, linkTo }: Props) => (
	<Card
		onClick={onClick}
		linkTo={linkTo}
		display={display}
		header={classroom.title}
		subheader={classroom.teachers.map((t) => t.name).join(', ')}
	/>
)

ClassroomCard.defaultProps = {
	display: 'list',
	onClick: null,
	linkTo: null,
}

export default ClassroomCard
