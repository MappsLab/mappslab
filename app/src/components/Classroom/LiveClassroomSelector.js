// @flow
import React from 'react'
import { ClassroomsQuery } from 'Queries'
import { LiveSelector } from 'Components/Selector'
import { ClassroomChip } from 'Components/Classroom'

/**
 * LiveClassroomSelector
 */

type Props = {
	disabled?: boolean,
	delayQuery?: boolean,
	onSelect: ({ value: string }) => void,
}

// TODO: Abstract the query implementation into LiveSelector

const LiveClassroomSelector = ({ disabled, delayQuery, onSelect }: Props) => (
	<ClassroomsQuery variables={{ first: 25 }} delayQuery={delayQuery} LoadingComponent={false}>
		{({ data, refetch }) => {
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
			const items =
				data && data.classrooms
					? data.classrooms.map((c) => ({
							value: c.uid,
							label: c.title,
							render: ({ highlighted, selected }) => <ClassroomChip classroom={c} active={highlighted || selected} />,
					  }))
					: []
			return (
				<LiveSelector
					label="Select your classroom"
					disabled={disabled || items.length === 0}
					onSelect={onSelect}
					items={items}
					refetchQuery={refetchQuery}
				/>
			)
		}}
	</ClassroomsQuery>
)

LiveClassroomSelector.defaultProps = {
	disabled: false,
	delayQuery: false,
}

export default LiveClassroomSelector
