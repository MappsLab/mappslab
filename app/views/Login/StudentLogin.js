// @flow
import React from 'react'
import { State } from 'react-automata'
import { ClassroomSelector } from 'Components/Classroom'
// import { ClassroomSelector } from 'Components/Classroom'

import {
	// states
	SELECT_CLASSROOM,
	SELECT_STUDENT,
	// transitions
	SELECTED_CLASSROOM,
	SELECTED_STUDENT,
} from './statechart'

/**
 * StudentLogin
 */

type Props = {
	makeTransition: (string, {}) => () => void,
	classroomUid?: null | string,
	//  transition: (string, {}) => void,
}

const StudentLogin = ({ makeTransition, classroomUid }: Props) => {
	const selectClassroom = (uid) => {
		console.log(uid)
		makeTransition(SELECTED_CLASSROOM, { classroomUid: c.uid })
	}

	return (
		<React.Fragment>
			<State is={SELECT_CLASSROOM} render={() => <ClassroomSelector onSelect={selectClassroom} />} />
			<State is={SELECT_STUDENT} render={(active) => <ClassroomSelector disabled={!active} onSelect={selectClassroom} />} />
		</React.Fragment>
	)
}

StudentLogin.defaultProps = {
	classroomUid: null,
}

export default StudentLogin
