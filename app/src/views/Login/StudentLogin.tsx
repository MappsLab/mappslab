import React from 'react'
import { State } from 'react-automata'
import { LiveClassroomSelector } from '../../components/Classroom'
import { UserSelector } from '../../components/User'

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

interface Props {
	transition: (name: string, something: {}) => void
	classroomUid?: null | string
}

export const StudentLogin = ({ transition, classroomUid }: Props) => {
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
		<>
			<State
				is={SELECT_CLASSROOM}
				render={() => <LiveClassroomSelector onSelect={selectClassroom} />}
			/>
			<State
				is={SELECT_STUDENT}
				render={(active: boolean) => (
					<UserSelector
						delayQuery={!active}
						disabled={!active}
						onSelect={selectUser}
						variables={userVariables}
					/>
				)}
			/>
		</>
	)
}

StudentLogin.defaultProps = {
	classroomUid: null,
}
