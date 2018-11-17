// @flow
import * as React from 'react'
import { adopt } from 'react-adopt'
import type { ViewerType, ClassroomType, UserType } from 'Types'
import type { Mutation } from 'Types/GraphQL'
import { UpdateClassroomMutation, ClassroomQuery } from 'Queries'
import Pane from 'Components/Pane'
import type { InspectItem } from '../InspectorProvider'
import type { ListItemType } from './List'
import EditableText from '../EditableText'
import List from './List'

/**
 * ClassroomInspector
 */

type Props = {
	inspectItem: InspectItem,
	updateClassroom: Mutation,
	paneTitle: string,
	classroomQuery: {
		loading: boolean,
		data: { classroom?: ClassroomType },
	},
}

const ClassroomInspector = (props: Props) => {
	const {
		paneTitle,
		updateClassroom,
		inspectItem,
		classroomQuery: {
			loading,
			data: { classroom },
		},
	} = props

	if (loading || !classroom) {
		return (
			<Pane size="full" title={paneTitle}>
				Loading...
			</Pane>
		)
	}

	const update = async (fieldData) => {
		const variables = { uid: classroom.uid, ...fieldData }
		console.log(fieldData)
		await updateClassroom({ variables })
	}

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

	const viewerCanEdit = classroom.viewerIsTeacher

	return (
		<Pane size="full" title={classroom.title} viewerCanEdit={viewerCanEdit} updateTitle={update}>
			<EditableText
				initialValue={classroom.description}
				name="description"
				label="Description"
				multiline
				viewerCanEdit={viewerCanEdit}
				updateFn={update}
				placeholder="Give this classroom a descrpition.."
			/>
			<List title="Maps" type="map" items={maps} />
			<List title="Students" type="user" items={students} />
			<List title="Teachers" type="user" items={teachers} />
		</Pane>
	)
}

/**
 * Load in the required queries & mutations
 */

type BaseProps = {
	inspectItem: InspectItem,
	viewer: null | ViewerType,
	uid: string,
}

const Composed = adopt({
	classroomQuery: ({ uid, render }) => (
		<ClassroomQuery LoadingComponent={false} variables={{ uid }}>
			{render}
		</ClassroomQuery>
	),
	updateClassroom: <UpdateClassroomMutation />,
})

export default ({ uid, ...baseProps }: BaseProps) => (
	<Composed uid={uid}>{(composedProps) => <ClassroomInspector {...baseProps} {...composedProps} />}</Composed>
)
