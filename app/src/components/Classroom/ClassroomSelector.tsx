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
		label: c.title,
		render: ({ highlighted, selected }) => (
			<SelectorItem title={c.title} active={highlighted || selected} />
		),
	}))
	return (
		<Selector items={items} label={label || 'Select a Classroom'} {...props} />
	)
}

ClassroomSelector.defaultProps = {
	label: 'Select a Classroom',
}
