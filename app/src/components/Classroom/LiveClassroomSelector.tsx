import React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/react-hooks'
import { classroomsQuery, ClassroomsQueryResponse } from '../../queries'
import { LiveSelector, SelectorItem } from '../Selector'

/**
 * LiveClassroomSelector
 */

interface LiveClassroomSelectorProps {
	disabled?: boolean
	delayQuery?: boolean
	onSelect: ({ value: string }) => void
}

export const LiveClassroomSelector = ({
	disabled,
	delayQuery,
	onSelect,
}: LiveClassroomSelectorProps) => {
	const { loading, data, refetch } = useQuery<ClassroomsQueryResponse>(
		classroomsQuery,
		{ variables: { first: 25 } },
	)
	const refetchQuery = (input: string) => {
		if (input.length < 3) {
			refetch({ where: {} })
			return
		}
		refetch({
			where: {
				title: {
					contains: input,
				},
			},
		})
	}
	const classrooms =
		data && data.classrooms && data.classrooms.edges
			? unwindEdges(data.classrooms)[0]
			: []
	const items = classrooms.map((c) => ({
		value: c.uid,
		label: c.title,
		render: ({ highlighted, selected }) => (
			<SelectorItem title={c.title} active={highlighted || selected} />
		),
	}))
	return (
		<LiveSelector
			label="Select your classroom"
			disabled={disabled || items.length === 0}
			onSelect={onSelect}
			items={items}
			refetchQuery={refetchQuery}
		/>
	)
}

LiveClassroomSelector.defaultProps = {
	disabled: false,
	delayQuery: false,
}
