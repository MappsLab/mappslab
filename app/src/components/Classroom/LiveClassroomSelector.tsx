import React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/client'
import {
	classroomsQuery,
	ClassroomsResponse,
	ClassroomsInput,
} from '../../queries'
import { LiveSelector, SelectorItem } from '../Selector'

/**
 * LiveClassroomSelector
 */

interface LiveClassroomSelectorProps {
	disabled?: boolean
	onSelect: ({ value: string }) => void
}

export const LiveClassroomSelector = ({
	disabled,
	onSelect,
}: LiveClassroomSelectorProps) => {
	const { data, refetch } = useQuery<ClassroomsResponse, ClassroomsInput>(
		classroomsQuery,
		{ variables: { first: 25 } },
	)
	const [classrooms] = unwindEdges(data?.classrooms)

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

	const items = classrooms.map((c) => ({
		value: c.uid,
		label: c.title || 'Untitled Classroom',
		render: ({
			highlighted,
			selected,
		}: {
			highlighted: boolean
			selected: boolean
		}) => (
			<SelectorItem
				title={c.title || 'Untitled Classroom'}
				active={highlighted || selected}
			/>
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
