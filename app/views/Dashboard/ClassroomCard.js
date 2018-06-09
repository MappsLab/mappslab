// @flow
import React from 'react'
import type { ClassroomType } from 'App/types'
import { Column } from 'App/components/Layout'
import { Header2, Header3 } from 'App/components/Text'

/**
 * ClassroomCard
 */

type Props = {
	classroom: ClassroomType,
}

const ClassroomCard = ({ classroom }: Props) => {
	return (
		<Column>
			<Header2>{classroom.title}</Header2>
			<Header3 color="middleGray">{classroom.teachers && classroom.teachers.map((t) => t.name).join(', ')}</Header3>
		</Column>
	)
}

export default ClassroomCard
