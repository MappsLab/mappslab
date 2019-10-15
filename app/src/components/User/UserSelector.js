// @flow
import React from 'react'
import merge from 'deepmerge'
import { unwindEdges } from '@good-idea/unwind-edges'
import { UsersQuery } from 'Queries'
import { LiveSelector, SelectorItem } from 'Components/Selector'
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
	<UsersQuery variables={variables} delayQuery={delayQuery} LoadingComponent={false}>
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
				const newVariables = merge(variables, nameFilter)
				refetch(newVariables)
			}
			const items =
				data && data.users
					? unwindEdges(data.users)[0].map((user) => ({
							value: user.uid,
							label: user.name,
							render: ({ highlighted, selected }) => <SelectorItem title={user.name} active={highlighted || selected} />,
					  }))
					: []
			return (
				<LiveSelector
					label="select your account"
					disabled={disabled || items.length === 0}
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
