import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Viewer, User, Mutation, QueryConfig } from '../../../types-ts'
import { UpdateUserMutation, UserQuery } from '../../../queries/User'
import { CreateClassroomMutation } from '../../../queries/Classroom'
import { ClassroomList } from '../../Lists'
import { InspectItem } from '../InspectorProvider'
import { InspectorSkeleton } from '../InspectorSkeleton'

/**
 * UserInspector
 */

interface BaseProps {
	viewer: null | Viewer
	inspectItem: InspectItem
}

interface Props extends BaseProps {
	userQueryConfig: QueryConfig
	user: User
	updateUser: Mutation
	createClassroom: Mutation
}

const UserInspectorMain = ({
	user,
	viewer,
	updateUser,
	inspectItem,
	userQueryConfig,
	createClassroom,
}: Props) => {
	const updateUserClassrooms = (classroom) => {
		const variables = {
			input: {
				uid: user.uid,
				addToClassrooms: [classroom.uid],
			},
		}
		updateUser({ variables, refetchQueries: [userQueryConfig] })
	}

	const createClassroomOnClick = async (inputValue) => {
		const variables = {
			input: {
				title: inputValue,
				addTeachers: [user.uid],
			},
		}
		createClassroom({ variables, refetchQueries: [userQueryConfig] })
	}

	const classrooms =
		user.classrooms && user.classrooms.edges.length
			? unwindEdges(user.classrooms)[0]
			: []

	return (
		<>
			<ClassroomList
				title="Classrooms"
				items={classrooms}
				viewerCanAdd={Boolean(viewer && user.uid === viewer.uid)}
				update={updateUserClassrooms}
				onItemClick={inspectItem}
				create={createClassroomOnClick}
			/>
		</>
	)
}

export const UserInspector = ({
	uid,
	...baseProps
}: BaseProps & { uid: string }) => (
	<CreateClassroomMutation>
		{(createClassroom) => (
			<UpdateUserMutation>
				{(updateUser) => (
					<UserQuery variables={{ uid }}>
						{({ data, loading, queryConfig }) =>
							loading ? (
								<InspectorSkeleton />
							) : (
								<UserInspectorMain
									{...baseProps}
									userQueryConfig={queryConfig}
									user={data.user}
									updateUser={updateUser}
									createClassroom={createClassroom}
								/>
							)
						}
					</UserQuery>
				)}
			</UpdateUserMutation>
		)}
	</CreateClassroomMutation>
)
