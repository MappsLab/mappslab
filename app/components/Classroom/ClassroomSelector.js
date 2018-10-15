// @flow
import React from 'react'
import { ClassroomsQuery } from 'Queries'
import { LiveSelector } from 'Components/Selector'
import { ClassroomChip } from 'Components/Classroom'

/**
 * ClassroomSelector
 */

type WrapperProps = {
	onSelect: () => void,
}

const Wrapper = (props: WrapperProps) => (
	<ClassroomsQuery variables={{ first: 25 }}>
		{({ data, refetch }) => {
			const refetchQuery = (input: string) => {
				if (input.length < 3) {
					refetch({ filter: {} })
					return
				}
				refetch({
					filter: {
						title: {
							contains: input,
						},
					},
				})
			}
			const items = data.classrooms.map((c) => ({
				value: c.uid,
				label: c.title,
				render: ({ highlighted, selected }) => <ClassroomChip classroom={c} active={highlighted || selected} />,
			}))
			return <LiveSelector {...props} items={items} refetchQuery={refetchQuery} />
		}}
	</ClassroomsQuery>
)

export default Wrapper
