// @flow
import * as React from 'react'
import type { ViewerType, UserType } from 'Types/User'
import type { Mutation, QueryConfig } from 'Types/GraphQL'
import { UpdateUserMutation, UserQuery } from 'Queries/User'
import { CreateClassroomMutation } from 'Queries/Classroom'
import { ClassroomList } from 'Components/Lists'
import type { InspectItem } from '../InspectorProvider'
import InspectorSkeleton from '../InspectorSkeleton'

/**
 * UserInspector
 */

type BaseProps = {
	viewer: null | ViewerType,
	inspectItem: InspectItem,
}

type Props = BaseProps & {
	userQueryConfig: QueryConfig,
	user: UserType,
	updateUser: Mutation,
	createClassroom: Mutation,
}

const UserInspector = ({ user, viewer, updateUser, inspectItem, userQueryConfig, createClassroom }: Props) => {
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

	return (
		<React.Fragment>
			<ClassroomList
				title="Classrooms"
				parent={user}
				items={user.classrooms || []}
				viewerCanAdd={Boolean(viewer && user.uid === viewer.uid)}
				update={updateUserClassrooms}
				onItemClick={inspectItem}
				create={createClassroomOnClick}
			/>
		</React.Fragment>
	)
}

const Wrapper = ({ uid, ...baseProps }: BaseProps & { uid: string }) => (
	<CreateClassroomMutation>
		{(createClassroom) => (
			<UpdateUserMutation>
				{(updateUser) => (
					<UserQuery variables={{ uid }}>
						{({ data, loading, queryConfig }) =>
							loading ? (
								<InspectorSkeleton />
							) : (
								<UserInspector
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

export default Wrapper
