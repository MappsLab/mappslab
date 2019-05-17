import * as React from 'react'
import { User } from 'Types/User'
import { UsersQuery } from '../../queries/User'
import { QuestionConsumer, QuestionContext } from '../Question'
import { Prompt } from '../Forms'
import { List } from './List'
import { ListOfTypeProps, ListOfTypeBaseProps } from './utils'
import { unwindEdges } from '../../utils/graphql'

const { useState } = React

/**
 * UserList
 */

type Props = ListOfTypeProps<User> & {
	userType: 'teacher' | 'student' | void
	question: QuestionContext
}

const UserListMain = ({
	title,
	searchQuery,
	searchResults,
	items,
	viewerCanAdd,
	update,
	onItemClick,
	userType,
	create,
	question,
}: Props) => {
	const [showResults, setShowResults] = useState(false)

	const search = (searchValue: string) => {
		if (searchValue.length < 3) {
			setShowResults(false)
		} else {
			setShowResults(true)
			const roleFilter = userType ? { roles: { includes: userType } } : {}
			searchQuery({
				input: {
					where: {
						name: {
							contains: searchValue,
						},
						...roleFilter,
					},
				},
			})
		}
	}

	const createUser = async (name: string) => {
		const emailQuestion =
			userType === 'teacher'
				? await question.ask({
						message: 'Enter an email address for this teacher',
						render: (answer) => <Prompt answer={answer} name="email" label="Teacher Email" type="email" />,
				  })
				: undefined
		if (userType === 'teacher' && !emailQuestion) return
		const tempPassQuestion = await question.ask({
			message: 'Enter a temporary password for this user',
			render: (answer) => <Prompt answer={answer} name="temporaryPassword" label="Temporary Password" />,
		})
		if (!tempPassQuestion) return
		const email = emailQuestion ? emailQuestion.email : {}
		const { temporaryPassword } = tempPassQuestion
		create({ name, email, temporaryPassword })
	}

	return (
		<List
			title={title}
			search={search}
			searchResults={showResults ? searchResults : []}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="user"
			// $FlowFixMe
			items={items}
			create={createUser}
			onItemClick={onItemClick}
		/>
	)
}

type BaseProps = ListOfTypeBaseProps<User> & {
	userType: 'teacher' | 'student' | void
}

export const UserList = (baseProps: BaseProps) => (
	<QuestionConsumer>
		{(question) => (
			<UsersQuery delayQuery>
				{({ data, refetch }) => (
					// $FlowFixMe
					<UserListMain
						question={question}
						searchQuery={refetch}
						searchResults={data ? unwindEdges<User>(data.users)[0] || [] : []}
						{...baseProps}
					/>
				)}
			</UsersQuery>
		)}
	</QuestionConsumer>
)
