// @flow
import React from 'react'
import deepMerge from 'deepmerge'
import { UsersQuery } from 'Queries'
import { LiveSelector } from 'Components/Selector'
import { UserChip } from 'Components/User'

/**
 * UserSelector
 */

type Props = {
	disabled?: boolean,
	delayQuery?: boolean,
	onSelect: ({ value: string }) => void,
	variables?: any,
}

const UserSelector = ({ disabled, onSelect, delayQuery, variables }: Props) => (
	<UsersQuery variables={variables} delayQuery={delayQuery}>
		{({ data, refetch }) => {
			const refetchQuery = (input: string) => {
				if (input.length < 3) {
					refetch(variables)
					return
				}
				const nameFilter = {
					where: {
						name: {
							contains: input,
						},
					},
				}
				const newVariables = deepMerge(variables, nameFilter)
				refetch(newVariables)
			}
			const items = data.users
				? data.users.map((user) => ({
						value: user.uid,
						label: user.name,
						render: ({ highlighted, selected }) => <UserChip user={user} active={highlighted || selected} />,
				  }))
				: []
			return (
				<LiveSelector
					label="select your account"
					disabled={disabled}
					onSelect={onSelect}
					items={items}
					refetchQuery={refetchQuery}
				/>
			)
		}}
	</UsersQuery>
)

UserSelector.defaultProps = {
	disabled: false,
	delayQuery: false,
	variables: {},
}

export default UserSelector
