import React from 'react'
import { Selector, SelectorItem } from '../Selector'
import { Classroom } from '../../types-ts'

/**
 * ClassroomSelector
 */

type Props = {
	label?: string
	classrooms: Classroom[]
}

export const ClassroomSelector = ({ classrooms, label, ...props }: Props) => {
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
		<Selector items={items} label={label || 'Select a Classroom'} {...props} />
	)
}

ClassroomSelector.defaultProps = {
	label: 'Select a Classroom',
}
