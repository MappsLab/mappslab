// @flow
import * as React from 'react'
import type { UserType } from 'Types/User'
import { UsersQuery } from 'Queries/User'
import List from './List'
import type { ListOfTypeProps, ListOfTypeBaseProps } from './utils'

const { useState } = React

/**
 * UserList
 */

type Props = ListOfTypeProps<UserType> & {
	userType: 'teacher' | 'student' | undefined,
}

const UserList = ({ title, searchQuery, searchResults, items, viewerCanAdd, update, onItemClick, userType }: Props) => {
	const [showResults, setShowResults] = useState(false)

	const search = (searchValue: string) => {
		if (searchValue.length < 3) {
			setShowResults(false)
		} else {
			setShowResults(true)
			const roleFilter = userType ? { roles: { includes: userType } } : {}
			searchQuery({
				where: {
					name: {
						contains: searchValue,
					},
					...roleFilter,
				},
			})
		}
	}

	console.log('?')

	return (
		<List
			title={title}
			search={search}
			searchResults={showResults ? searchResults : []}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="user"
			items={items}
			onItemClick={onItemClick}
		/>
	)
}

const defaultVariables = {
	where: {
		name: {
			contains: '___',
		},
	},
}

const UserListWrapper = (baseProps: ListOfTypeBaseProps<UserType>) => (
	<UsersQuery variables={defaultVariables}>
		{({ data, loadQuery }) => <UserList searchQuery={loadQuery} searchResults={data ? data.users || [] : []} {...baseProps} />}
	</UsersQuery>
)

export default UserListWrapper
