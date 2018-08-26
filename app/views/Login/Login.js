// @flow
import React from 'react'
import { withStateMachine, Action } from 'react-automata'
import { Link } from 'react-router-dom'
import Pane from 'Components/Pane'
import { Header1, Header4 } from 'Components/Text'
import { Centered } from 'Components/Layout'
import { Button } from 'Components/UI'
import { ClassroomsQuery, ClassroomQuery, UserQuery } from 'Queries'
import SelectClassroom from './SelectClassroom'
import SelectStudent from './SelectStudent'
import UserLogin from './UserLogin'
// import Welcome from './Welcome'

import {
	statechart,
	ENTER_WELCOME,
	SELECTED_TEACHER_LOGIN,
	ENTER_STUDENT_SELECT,
	ENTER_CLASSROOM_SELECT,
	ENTER_USER_LOGIN,
	GO_BACK,
	ENTER_SUCCESS,
} from './statechart'

/**
 * Login
 */

type Props = {
	transition: (string, ?{}) => void,
	classroomUid?: null | string,
	userUid?: null | string,
}

/**
 * Login
 */

const Login = (props: Props) => {
	const { transition, classroomUid, userUid } = props
	const goBack = () => {
		transition(GO_BACK)
	}
	const goToTeacherLogin = () => {
		transition(SELECTED_TEACHER_LOGIN)
	}

	return (
		<Centered>
			<Pane size="small">
				<Header1 align="center">Welcome to Mappslab!</Header1>
				<Action is={[ENTER_CLASSROOM_SELECT]}>
					<ClassroomsQuery>
						{({ data }) => <SelectClassroom transition={transition} classrooms={data.classrooms} />}
					</ClassroomsQuery>
				</Action>
				<Action is={[ENTER_STUDENT_SELECT]}>
					<ClassroomQuery variables={{ uid: classroomUid }}>
						{({ data }) => <SelectStudent classroom={data.classroom} transition={transition} />}
					</ClassroomQuery>
				</Action>
				<Action is={[ENTER_WELCOME, ENTER_STUDENT_SELECT]}>
					<Button secondary onClick={goToTeacherLogin}>
						Teacher Login
					</Button>
				</Action>

				<Action is={ENTER_USER_LOGIN}>
					<UserQuery variables={{ uid: userUid }}>
						{({ data }) => <UserLogin user={data.user} transition={transition} />}
					</UserQuery>
				</Action>

				<Action is={ENTER_SUCCESS}>
					<Link to="/dashboard">Go to your dashboard</Link>
				</Action>
				<Action is={[]}>
					YOU ARE A TEACHER
					<Header4 align="center">
						<button onClick={goBack} type="button">
							back
						</button>
					</Header4>
				</Action>
			</Pane>
		</Centered>
	)
}

Login.defaultProps = {
	classroomUid: null,
	userUid: null,
}

export default withStateMachine(statechart)(Login)
