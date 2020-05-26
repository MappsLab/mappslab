import React from 'react'
import merge from 'deepmerge'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useUsersQuery } from '../../queries'
import { QueryUsersArgs } from '../../types-ts'
import { SelectorRenderProps, LiveSelector, SelectorItem } from '../Selector'

/**
 * UserSelector
 */

interface Props {
	disabled?: boolean
	onSelect: ({ value: string }) => void
	variables: QueryUsersArgs['input']
}

export const UserSelector = ({ disabled, onSelect, variables }: Props) => {
	const { data, refetch } = useUsersQuery(variables)
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
		const newVariables = merge(variables || {}, nameFilter)
		refetch(newVariables)
	}
	const items =
		data && data.users
			? unwindEdges(data.users)[0].map((user) => ({
					value: user.uid,
					label: user.name,
					render: ({ highlighted, selected }: SelectorRenderProps) => (
						<SelectorItem title={user.name} active={highlighted || selected} />
					),
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
}

UserSelector.defaultProps = {
	disabled: false,
	delayQuery: false,
	variables: {},
}
