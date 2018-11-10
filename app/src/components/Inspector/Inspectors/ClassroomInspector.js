// @flow
import * as React from 'react'
import type { ViewerType, ClassroomType, UserType, MapType } from 'Types'
import { ClassroomQuery } from 'Queries'
import { Header1 } from 'Components/Text'
import type { InspectItem } from '../InspectorProvider'
import List from './List'
import type { ListItemType } from './List'

/**
 * ClassroomInspector
 */

type Props = {
	classroom: ClassroomType,
	viewer: ViewerType,
	inspectItem: InspectItem,
}

const ClassroomInspector = (props: Props) => {
	const { classroom, inspectItem } = props

	const userToItem = (u: UserType): ListItemType => ({
		key: u.uid,
		title: u.name,
		info: [],
		onClick: () => {
			inspectItem({ uid: u.uid, type: 'user', title: u.name })
		},
	})

	const maps = classroom.maps.map((m) => ({
		key: m.uid,
		title: m.title,
		info: [],
		onClick: () => {
			inspectItem({ uid: m.uid, type: 'map', title: m.title })
		},
	}))

	const students = classroom.students.map(userToItem)
	const teachers = classroom.teachers.map(userToItem)

	return (
		<React.Fragment>
			<Header1>{classroom.title}</Header1>
			<List title="Maps" items={maps} />
			<List title="Students" items={students} />
			<List title="Teachers" items={teachers} />
		</React.Fragment>
	)
}

type BaseProps = {
	viewer: ViewerType,
	uid: string,
	inspectItem: InspectItem,
}

export default ({ uid, ...baseProps }: BaseProps) => (
	<ClassroomQuery variables={{ uid }}>
		{({ data }) => <ClassroomInspector classroom={data.classroom} {...baseProps} />}
	</ClassroomQuery>
)
