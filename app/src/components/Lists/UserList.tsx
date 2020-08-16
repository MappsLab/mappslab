import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { User } from '../../types-ts'
import { useLazyQuery } from '@apollo/client'
import {
	UsersQueryInput,
	UsersQueryResponse,
	usersQuery,
} from '../../queries/user'
import { useQuestion } from '../Question'
import { Prompt } from '../Forms'
import { List } from './List'
import { ListOfTypeProps } from './utils'

/**
 * UserList
 */

type Props = ListOfTypeProps<User> & {
	userType: 'teacher' | 'student' | void
}

export const UserList = ({
	title,
	items,
	viewerCanAdd,
	update,
	onItemClick,
	userType,
	create,
}: Props) => {
	const { ask } = useQuestion()
	const [fetchUsers, { data }] = useLazyQuery<
		UsersQueryResponse,
		UsersQueryInput
	>(usersQuery)
	const [searchResults] = unwindEdges(data?.users)

	const search = (searchValue: string) => {
		const roleFilter = userType ? { roles: { includes: userType } } : {}
		fetchUsers({
			variables: {
				where: {
					name: {
						contains: searchValue,
					},
					...roleFilter,
				},
			},
		})
	}

	const createUser = async (name: string) => {
		if (!create) return
		const emailQuestion =
			userType === 'teacher'
				? await ask({
						message: 'Enter an email address for this teacher',
						render: (answer) => (
							<Prompt
								answer={answer}
								name="email"
								label="Teacher Email"
								type="email"
							/>
						),
				  })
				: undefined
		if (userType === 'teacher' && !emailQuestion) return
		const tempPassQuestion = await ask({
			message: 'Enter a temporary password for this user',
			render: (answer) => (
				<Prompt
					answer={answer}
					name="temporaryPassword"
					label="Temporary Password"
				/>
			),
		})
		if (!tempPassQuestion) return
		const email = emailQuestion ? emailQuestion.email : undefined
		const { temporaryPassword } = tempPassQuestion
		create({ name, email, temporaryPassword })
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
			create={createUser}
			onItemClick={onItemClick}
		/>
	)
}
