import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { User, Classroom } from '../../../types-ts'
import { useUpdateUserMutation } from '../../../queries/user'
import { useCreateClassroomMutation } from '../../../queries/classroom'
import { ClassroomList } from '../../Lists'
import { useInspector } from '../InspectorProvider'
import { useCurrentViewer } from '../../../providers/CurrentViewer'

/**
 * UserInspector
 */

interface Props {
	user: User
}

export const UserInspector = ({ user }: Props) => {
	const { viewer } = useCurrentViewer()
	const { inspectItem } = useInspector()
	const [updateUser] = useUpdateUserMutation(user.uid)
	const [createClassroom] = useCreateClassroomMutation(user.uid)

	const updateUserClassrooms = (classroom: Classroom) => {
		const variables = {
			input: {
				uid: user.uid,
				addToClassrooms: [classroom.uid],
			},
		}
		updateUser({ variables })
	}

	const createClassroomOnClick = async (title: string) => {
		const variables = {
			input: {
				title,
				addTeachers: [user.uid],
			},
		}
		createClassroom({ variables })
	}

	const classrooms =
		user.classrooms && user.classrooms.edges.length
			? unwindEdges(user.classrooms)[0]
			: []

	return (
		<ClassroomList
			title="Classrooms"
			items={classrooms}
			viewerCanAdd={Boolean(viewer && user.uid === viewer.uid)}
			update={updateUserClassrooms}
			onItemClick={inspectItem}
			create={createClassroomOnClick}
		/>
	)
}
