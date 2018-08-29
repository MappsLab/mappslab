// @flow
import React from 'react'
import { State } from 'react-automata'
import { ClassroomsQuery, ClassroomQuery } from 'Queries'
import { ClassroomCard } from 'Components/Classroom'
import { UserCard } from 'Components/User'

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
	return (
		<React.Fragment>
			<State is={SELECT_CLASSROOM}>
				<ClassroomsQuery>
					{({ data }) =>
						data.classrooms.map((c) => (
							<button key={c.uid} type="button" onClick={makeTransition(SELECTED_CLASSROOM, { classroomUid: c.uid })}>
								<ClassroomCard classroom={c} />
							</button>
						))
					}
				</ClassroomsQuery>
			</State>
			<State is={SELECT_STUDENT}>
				<ClassroomQuery variables={{ uid: classroomUid }}>
					{({ data }) =>
						data.classroom.students.map((s) => (
							<button key={s.uid} type="button" onClick={makeTransition(SELECTED_STUDENT, { userUid: s.uid })}>
								<UserCard user={s} />
							</button>
						))
					}
				</ClassroomQuery>
			</State>
		</React.Fragment>
	)
}

StudentLogin.defaultProps = {
	classroomUid: null,
}

export default StudentLogin
