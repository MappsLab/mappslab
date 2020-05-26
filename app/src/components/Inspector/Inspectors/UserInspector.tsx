import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Classroom } from '../../../types-ts'
import { useUserQuery, useUpdateUserMutation } from '../../../queries/user'
import { useCreateClassroomMutation } from '../../../queries/classroom'
import { ClassroomList } from '../../Lists'
import { useInspector } from '../InspectorProvider'
import { useCurrentViewer } from '../../../providers/CurrentViewer'

/**
 * UserInspector
 */

interface Props {
	userUid: string
}

export const UserInspector = ({ userUid }: Props) => {
	const { viewer } = useCurrentViewer()
	const { inspectItem } = useInspector()
	const response = useUserQuery({ uid: userUid })
	const user = response?.data?.user
	const [updateUser] = useUpdateUserMutation(user?.uid || '')
	const [createClassroom] = useCreateClassroomMutation({ userUid })

	if (response.loading || !user) return null

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
