// @flow
import React from 'react'
import Dropdown from 'Components/Dropdown'
import { UserCard } from 'Components/User'
import { Header4 } from 'Components/Text'
import type { ClassroomType } from 'Types'
import type { transition as transitionType } from 'react-automata'
import { FOUND_USER } from './statechart'

/**
 * SelectStudent
 */

type Props = {
	classroom: ClassroomType,
	transition: transitionType,
}
const SelectStudent = ({ classroom, transition }: Props) => {
	const handleSelect = (userUid) => {
		transition(FOUND_USER, { userUid })
	}
	const { students } = classroom
	return students ? (
		<Dropdown
			label="Select Your Account"
			open
			onSelect={handleSelect}
			items={students.map((s) => ({
				value: s.uid,
				// eslint-disable-next-line react/prop-types
				render: ({ active }) => <UserCard active={active} user={s} display="list" />,
			}))}
		/>
	) : (
		<Header4>This classroom is empty</Header4>
	)
}

export default SelectStudent
