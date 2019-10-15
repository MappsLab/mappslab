import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Classroom, Viewer, Mutation, QueryConfig, User } from '../../../types-ts'
import { UpdateClassroomMutation, ClassroomQuery } from '../../../queries/Classroom'
import { CreateMapMutation } from '../../../queries/Map'
import { CreateStudentMutation, CreateTeacherMutation } from '../../../queries/User'
import { MapList, UserList } from '../../Lists'
import { InspectItem } from '../InspectorProvider'
import InspectorSkeleton from '../InspectorSkeleton'

/**
 * ClassroomInspector
 */

interface BaseProps {
	inspectItem: InspectItem
	viewer: Viewer | null
}

interface Props extends BaseProps {
	classroom: Classroom
	classroomQueryConfig: QueryConfig
	updateClassroom: Mutation
	createTeacher: Mutation
	createStudent: Mutation
	createMap: Mutation
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

const ClassroomInspectorMain = ({
	viewer,
	classroom,
	updateClassroom,
	inspectItem,
	classroomQueryConfig,
	createTeacher,
	createStudent,
	createMap,
}: Props) => {
	const updateClassroomUsers = (user) => {
		const addKey = user.roles.includes('teacher') ? 'addTeachers' : 'addStudents'
		const variables = {
			input: {
				uid: classroom.uid,
				[addKey]: [user.uid],
			},
		}
		updateClassroom({ variables, refetchQueries: [classroomQueryConfig] })
	}

	const updateClassroomMaps = (map) => {
		const variables = {
			input: {
				uid: classroom.uid,
				addMaps: [map.uid],
			},
		}
		updateClassroom({ variables, refetchQueries: [classroomQueryConfig] })
	}

	const createMapInClassroom = async (title: string) => {
		const variables = {
			input: {
				title,
				addToClassrooms: [classroom.uid],
			},
		}
		await createMap({ variables, refetchQueries: [classroomQueryConfig] })
	}

	const createUserInClassroom = (role: 'student' | 'teacher') => async ({ name, email, temporaryPassword }: CreateUserFnArgs) => {
		const mutationByRole = {
			student: createStudent,
			teacher: createTeacher,
		}
		const mutate = mutationByRole[role]
		if (!mutate) throw new Error(`There is no mutation for creating a user with the role "${role}"`)
		// const addKey = role === 'student' ? 'addStudents' | 'addTeacher'
		const variables = {
			input: {
				name,
				email,
				temporaryPassword,
				addToClassrooms: [classroom.uid],
			},
		}
		await mutate({ variables, refetchQueries: [classroomQueryConfig] })
	}

	const teachers = classroom.teachers && classroom.teachers.edges.length ? unwindEdges<User>(classroom.teachers)[0] : []
	const maps = classroom.maps && classroom.maps.edges.length ? unwindEdges(classroom.maps)[0] : []
	const students = classroom.students && classroom.students.edges.length ? unwindEdges(classroom.students)[0] : []

	const viewerCanAdd = Boolean(
		viewer &&
			(viewer.roles.includes('admin') ||
				(viewer.roles.includes('teacher') || (teachers && teachers.length && teachers.map((t) => t.uid).includes(viewer.uid)))),
	)

	return (
		<React.Fragment>
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
		</React.Fragment>
	)
}

export const ClassroomInspector = ({ uid, ...baseProps }: BaseProps & { uid: string }) => (
	<ClassroomQuery LoadingComponent={false} variables={{ uid }}>
		{({ data, loading, queryConfig }) =>
			loading ? (
				<InspectorSkeleton />
			) : (
				<CreateMapMutation>
					{(createMap) => (
						<CreateTeacherMutation>
							{(createTeacher) => (
								<CreateStudentMutation>
									{(createStudent) => (
										<UpdateClassroomMutation>
											{(updateClassroom) => (
												<ClassroomInspectorMain
													classroom={data.classroom}
													classroomQueryConfig={queryConfig}
													updateClassroom={updateClassroom}
													createStudent={createStudent}
													createTeacher={createTeacher}
													createMap={createMap}
													{...baseProps}
												/>
											)}
										</UpdateClassroomMutation>
									)}
								</CreateStudentMutation>
							)}
						</CreateTeacherMutation>
					)}
				</CreateMapMutation>
			)
		}
	</ClassroomQuery>
)
