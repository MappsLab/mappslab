// @flow
import React from 'react'
import { ClassroomQuery, CurrentViewerQuery } from 'Queries'
import type { UserType } from 'Types/User'
import type { ClassroomType } from 'Types/Classroom'
import { ClassroomStudents } from './ClassroomRelationships'

/**
 * ClassroomBrowser
 */

type Props = {
	viewer: UserType,
	classroom: ClassroomType,
	canEdit: boolean,
}

const ClassroomBrowser = ({ viewer, classroom, canEdit }: Props) => {
	console.log(viewer, canEdit)
	return (
		<div>
			<h1>{classroom.title}</h1>
			{classroom.teachers.map((t) => (
				<h3 key={t.uid}>{t.name}</h3>
			))}
			<p>{classroom.description}</p>
			<ClassroomStudents classroomUid={classroom.uid} canEdit />
		</div>
	)
}

type BaseProps = {
	entity: {
		uid: string,
	},
}

export default ({ entity: { uid } }: BaseProps) => (
	<ClassroomQuery variables={{ uid }}>
		{({ data: { classroom } }) => (
			<CurrentViewerQuery>
				{({ data: { currentViewer } }) => (
					<ClassroomBrowser
						viewer={currentViewer.viewer}
						classroom={classroom}
						canEdit={Boolean(classroom.teachers.find((t) => t.uid === currentViewer.viewer.uid))}
					/>
				)}
			</CurrentViewerQuery>
		)}
	</ClassroomQuery>
)
