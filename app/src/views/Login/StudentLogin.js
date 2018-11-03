// @flow
import React from 'react'
import { State } from 'react-automata'
import { LiveClassroomSelector } from 'Components/Classroom'
import { UserSelector } from 'Components/User'
// import { LiveClassroomSelector } from 'Components/Classroom'

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
	transition: (string, ?{}) => void,
	classroomUid?: null | string,
}

const StudentLogin = ({ transition, classroomUid }: Props) => {
	const selectClassroom = ({ value }) => {
		transition(SELECTED_CLASSROOM, { classroomUid: value })
	}

	const selectUser = ({ value }) => {
		transition(SELECTED_STUDENT, { userUid: value })
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

	return (
		<React.Fragment>
			<State is={SELECT_CLASSROOM} render={() => <LiveClassroomSelector onSelect={selectClassroom} />} />
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
