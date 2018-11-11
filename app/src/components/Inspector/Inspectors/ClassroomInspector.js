// @flow
import * as React from 'react'
import type { ViewerType, ClassroomType, UserType } from 'Types'
import type { InspectItem } from '../InspectorProvider'
import List from './List'
import type { ListItemType } from './List'
import EditableText from '../EditableText'

/**
 * ClassroomInspector
 */

type Props = {
	classroom: ClassroomType,
	viewer: null | ViewerType,
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
			<EditableText
				initialValue={classroom.description}
				name="description"
				label="Description"
				placeholder="Give this classroom a descrpition.."
			/>
			<List title="Maps" type="map" items={maps} />
			<List title="Students" type="user" items={students} />
			<List title="Teachers" type="user" items={teachers} />
		</React.Fragment>
	)
}

export default ClassroomInspector
