// @flow
import * as React from 'react'
import type { ViewerType, UserType } from 'Types/User'
import type { Mutation, QueryConfig } from 'Types/GraphQL'
import { UpdateUserMutation, UserQuery } from 'Queries/User'
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
}

const UserInspector = ({ user, viewer, updateUser, inspectItem, userQueryConfig }: Props) => {
	const updateUserClassrooms = (classroom) => {
		const variables = {
			input: {
				uid: user.uid,
				addToClassrooms: [classroom.uid],
			},
		}
		updateUser({ variables, refetchQueries: [userQueryConfig] })
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
			/>
		</React.Fragment>
	)
}

const Wrapper = ({ uid, ...baseProps }: BaseProps & { uid: string }) => (
	<UpdateUserMutation>
		{(updateUser) => (
			<UserQuery variables={{ uid }}>
				{({ data, loading, queryConfig }) =>
					loading ? (
						<InspectorSkeleton />
					) : (
						<UserInspector {...baseProps} userQueryConfig={queryConfig} user={data.user} updateUser={updateUser} />
					)
				}
			</UserQuery>
		)}
	</UpdateUserMutation>
)

export default Wrapper
