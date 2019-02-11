// @flow
import * as React from 'react'
import type { UserType } from 'Types/User'
import { UsersQuery } from 'Queries/User'
import List from './List'
import type { ListOfTypeProps, ListOfTypeBaseProps } from './utils'

/**
 * UserList
 */

const UserList = ({ title, searchQuery, searchResults, items, viewerCanAdd, update, onItemClick }: ListOfTypeProps<UserType>) => {
	const search = (searchValue: string) => {
		if (searchValue.length < 3) return
		searchQuery({
			where: {
				name: {
					contains: searchValue,
				},
			},
		})
	}

	return (
		<List
			title={title}
			search={search}
			searchResults={searchResults}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="user"
			items={items}
			onItemClick={onItemClick}
		/>
	)
}

const UserListWrapper = (baseProps: ListOfTypeBaseProps<UserType>) => (
	<UsersQuery delayQuery>
		{({ data, loadQuery }) => <UserList searchQuery={loadQuery} searchResults={data ? data.users : []} {...baseProps} />}
	</UsersQuery>
)

export default UserListWrapper
