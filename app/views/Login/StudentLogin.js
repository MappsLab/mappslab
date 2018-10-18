// @flow
import React from 'react'
import { State } from 'react-automata'
import { ClassroomSelector } from 'Components/Classroom'
import { UserSelector } from 'Components/User'
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
}

const StudentLogin = ({ makeTransition, classroomUid }: Props) => {
	const selectClassroom = ({ value }) => {
		makeTransition(SELECTED_CLASSROOM, { classroomUid: value })()
	}

	const selectUser = ({ value }) => {
		console.log(value)
		makeTransition(SELECTED_STUDENT, { userUid: value })()
	}

	const userVariables = classroomUid
		? {
				where: {
					userLearnsIn: {
						eq: classroomUid,
					},
				},
		  }
		: {}
	console.log(classroomUid, userVariables)

	return (
		<React.Fragment>
			<State is={SELECT_CLASSROOM} render={() => <ClassroomSelector onSelect={selectClassroom} />} />
			<State
				is={SELECT_STUDENT}
				render={(active) => (
					<UserSelector delayQuery={!active} disabled={!active} onSelect={selectUser} variables={userVariables} />
				)}
			/>
		</React.Fragment>
	)
}

StudentLogin.defaultProps = {
	classroomUid: null,
}

export default StudentLogin
