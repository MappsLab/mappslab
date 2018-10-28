// @flow
import React from 'react'
import { Selector } from 'Components/Selector'
import type { ClassroomType } from 'Types/Classroom'
import ClassroomChip from './ClassroomChip'

/**
 * ClassroomSelector
 */

type Props = {
	label?: string,
	classrooms: Array<ClassroomType>,
}

const ClassroomSelector = ({ classrooms, label, ...props }: Props) => {
	const items = classrooms.map((c) => ({
		value: c.uid,
		label: c.title,
		render: ({ highlighted, selected }) => <ClassroomChip classroom={c} active={highlighted || selected} />,
	}))
	return <Selector items={items} label={label || 'Select a Classroom'} {...props} />
}

ClassroomSelector.defaultProps = {
	label: 'Select a Classroom',
}

export default ClassroomSelector
