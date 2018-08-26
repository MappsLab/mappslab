// @flow
import React from 'react'
import Dropdown from 'Components/Dropdown'
import { ClassroomCard } from 'Components/Classroom'
import type { ClassroomType } from 'Types'
import type { transition as transitionType } from 'react-automata'
import { SELECTED_CLASSROOM } from './statechart'

/**
 * LoginWelcome
 */

type Props = {
	transition: transitionType,
	classrooms: Array<ClassroomType>,
}

const SelectClassroom = ({ transition, classrooms }: Props) => {
	const handleSelect = (classroomUid) => {
		transition(SELECTED_CLASSROOM, { classroomUid })
	}

	return (
		<div>
			<Dropdown
				label="Select Your Classroom"
				onSelect={handleSelect}
				open
				items={classrooms.map((c) => ({
					value: c.uid,
					// eslint-disable-next-line react/prop-types
					render: ({ active }) => <ClassroomCard active={active} classroom={c} display="list" />,
				}))}
			/>
		</div>
	)
}

export default SelectClassroom
