// @flow
import * as React from 'react'
import type { ClassroomType } from 'Types/Classroom'
import type { ViewerType } from 'Types/User'
import type { Mutation, QueryConfig } from 'Types/GraphQL'
import { UpdateClassroomMutation, ClassroomQuery } from 'Queries/Classroom'
import { CreateMapMutation } from 'Queries/Map'
import { CreateStudentMutation, CreateTeacherMutation } from 'Queries/User'
import { MapList, UserList } from 'Components/Lists'
import type { InspectItem } from '../InspectorProvider'
import InspectorSkeleton from '../InspectorSkeleton'

/**
 * ClassroomInspector
 */

type BaseProps = {
	inspectItem: InspectItem,
	viewer: ViewerType | null,
}

type Props = BaseProps & {
	classroom: ClassroomType,
	classroomQueryConfig: QueryConfig,
	updateClassroom: Mutation,
	createTeacher: Mutation,
	createStudent: Mutation,
	createMap: Mutation,
}

type CreateUserFnProps = {
	name: string,
	email?: string,
	temporaryPassword: string,
}

const ClassroomInspector = ({
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

	const createUserInClassroom = (role: 'student' | 'teacher') => async ({
		name,
		email,
		temporaryPassword,
	}: CreateUserFnProps) => {
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
		console.log(variables)
		await mutate({ variables, refetchQueries: [classroomQueryConfig] })
	}

	const viewerCanAdd = Boolean(
		viewer &&
			(viewer.roles.includes('admin') ||
				(viewer.roles.includes('teacher') || classroom.teachers.map((t) => t.uid).includes(viewer.uid))),
	)

	return (
		<React.Fragment>
			<MapList
				title="Maps in this Classroom"
				items={classroom.maps || []}
				viewer={viewer}
				update={updateClassroomMaps}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
				create={createMapInClassroom}
			/>
			<UserList
				title="Students in this Classroom"
				userType="student"
				items={classroom.students || []}
				viewer={viewer}
				update={updateClassroomUsers}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
				create={createUserInClassroom('student')}
			/>
			<UserList
				title="Teachers in this Classroom"
				userType="teacher"
				items={classroom.teachers || []}
				viewer={viewer}
				update={updateClassroomUsers}
				onItemClick={inspectItem}
				viewerCanAdd={viewerCanAdd}
				create={createUserInClassroom('teacher')}
			/>
		</React.Fragment>
	)
}

const Wrapper = ({ uid, ...baseProps }: BaseProps & { uid: string }) => (
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
												<ClassroomInspector
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
export default Wrapper
