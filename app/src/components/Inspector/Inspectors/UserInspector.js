// @flow
import * as React from 'react'
import type { ViewerType, UserType, ClassroomType } from 'Types'
import type { Mutation } from 'Types/GraphQL'
import { ClassroomsQuery } from 'Queries/Classroom'
import { UpdateUserMutation } from 'Queries/User'
import { query as userQuery } from 'Queries/User/UserQuery'
import List from './List'

/**
 * UserInspector
 */

type BaseProps = {
	user: UserType,
	viewer: null | ViewerType,
}

type Props = BaseProps & {
	queryClassrooms: (any) => Promise<Array<ClassroomType>>,
	searchResults: Array<ClassroomType>,
	updateUser: Mutation,
}

const UserInspector = ({ user, searchResults, viewer, queryClassrooms, updateUser }: Props) => {
	const search = (searchValue: string) => {
		queryClassrooms({
			where: {
				title: {
					contains: searchValue,
				},
			},
		})
	}
	const viewerCanAdd = Boolean(viewer && viewer.uid === user.uid)
	const onSearchResultClick = (classroom) => {
		const variables = {
			input: {
				uid: user.uid,
				addToClassrooms: [classroom.uid],
			},
		}
		updateUser({ variables, refetchQueries: [{ query: userQuery, variables: { uid: user.uid } }] })
	}

	return (
		<React.Fragment>
			{user.classrooms && (
				<List
					title="Classrooms"
					search={search}
					searchResults={searchResults}
					onSearchResultClick={onSearchResultClick}
					viewerCanAdd={viewerCanAdd}
					type="classroom"
					items={user.classrooms}
				/>
			)}
		</React.Fragment>
	)
}

const Wrapper = (baseProps: BaseProps) => (
	<UpdateUserMutation>
		{(updateUser) => (
			<ClassroomsQuery delayQuery>
				{({ data, loadQuery }) => (
					<UserInspector
						queryClassrooms={loadQuery}
						updateUser={updateUser}
						searchResults={(data && data.classrooms) || []}
						{...baseProps}
					/>
				)}
			</ClassroomsQuery>
		)}
	</UpdateUserMutation>
)

export default Wrapper
