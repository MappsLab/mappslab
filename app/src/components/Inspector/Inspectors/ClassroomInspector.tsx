import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Map, User } from '../../../types-ts'
import {
	useClassroomQuery,
	useUpdateClassroomMutation,
} from '../../../queries/classroom'
import { useCreateMapMutation } from '../../../queries/map'
import {
	useCreateStudentMutation,
	useCreateTeacherMutation,
} from '../../../queries/user'
import { MapList, UserList } from '../../Lists'
import { useInspector } from '../InspectorProvider'
import { useCurrentViewer } from '../../../providers/CurrentViewer'

/**
 * ClassroomInspector
 */

interface Props {
	classroomUid: string
}

interface CreateUserFnArgs {
	/* Annoy: Eslint thinks that these are Component props */
	/* eslint-disable-next-line react/no-unused-prop-types */
	name: string
	/* eslint-disable-next-line */
	email?: string
	/* eslint-disable-next-line react/no-unused-prop-types */
	temporaryPassword: string
}

export const ClassroomInspector = ({ classroomUid }: Props) => {
	const { viewer } = useCurrentViewer()
	const { inspectItem } = useInspector()
	const response = useClassroomQuery({ uid: classroomUid })
	const classroom = response?.data?.classroom
	const [updateClassroom] = useUpdateClassroomMutation(classroom?.uid || '')
	const [createTeacher] = useCreateTeacherMutation({ classroomUid })
	const [createStudent] = useCreateStudentMutation({ classroomUid })
	const [createMap] = useCreateMapMutation({
		classroomUid,
	})

	if (response.loading || !classroom) return null

	const updateClassroomUsers = async (user: User) => {
		const addKey = user?.roles?.includes('teacher')
			? 'addTeachers'
			: 'addStudents'
		const variables = {
			uid: classroom.uid,
			[addKey]: [user.uid],
		}
		await updateClassroom({ variables })
	}

	const updateClassroomMaps = async (map: Map) => {
		const variables = {
			uid: classroom.uid,
			addMaps: [map.uid],
		}
		await updateClassroom({ variables })
	}

	const createMapInClassroom = async (title: string) => {
		const variables = {
			title,
			addToClassrooms: [classroom.uid],
		}
		await createMap({ variables })
	}

	const createUserInClassroom = (role: 'student' | 'teacher') => async ({
		name,
		email,
		temporaryPassword,
	}: CreateUserFnArgs) => {
		const mutationByRole = {
			student: createStudent,
			teacher: createTeacher,
		}
		const mutate = mutationByRole[role]
		if (!mutate)
			throw new Error(
				`There is no mutation for creating a user with the role "${role}"`,
			)
		const variables = {
			name,
			email: email || '',
			temporaryPassword,
			addToClassrooms: [classroom.uid],
		}
		await mutate({ variables })
	}

	const teachers =
		classroom.teachers && classroom.teachers.edges.length
			? unwindEdges<User>(classroom.teachers)[0]
			: []
	const maps =
		classroom.maps && classroom.maps.edges.length
			? unwindEdges(classroom.maps)[0]
			: []
	const students =
		classroom.students && classroom.students.edges.length
			? unwindEdges(classroom.students)[0]
			: []

	const viewerCanAdd = Boolean(
		viewer &&
			(viewer?.roles?.includes('admin') ||
				viewer?.roles?.includes('teacher') ||
				(teachers &&
					teachers.length &&
					teachers.map((t) => t.uid).includes(viewer.uid))),
	)

	return (
		<>
			<MapList
				title="Maps in this Classroom"
				items={maps}
				update={updateClassroomMaps}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
				create={createMapInClassroom}
			/>
			<UserList
				title="Students in this Classroom"
				userType="student"
				items={students}
				update={updateClassroomUsers}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
				create={createUserInClassroom('student')}
			/>
			<UserList
				title="Teachers in this Classroom"
				userType="teacher"
				items={teachers}
				update={updateClassroomUsers}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
				create={createUserInClassroom('teacher')}
			/>
		</>
	)
}
