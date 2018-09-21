// @flow
import React from 'react'
import { withStateMachine, State, Action } from 'react-automata'
import { Link } from 'react-router-dom'
import Pane from 'Components/Pane'
import { Header1 } from 'Components/Text'
import { Centered } from 'Components/Layout'
import { Button } from 'Components/UI'
import StudentLogin from './StudentLogin'
import TeacherLogin from './TeacherLogin'
import UserLogin from './UserLogin'
import LoginSuccess from './LoginSuccess'
import SetNewPassword from './SetNewPassword'
// import { ClassroomsQuery, ClassroomQuery, UserQuery } from 'Queries'
// import SelectClassroom from './SelectClassroom'
// import SelectStudent from './SelectStudent'
// import Welcome from './Welcome'

import {
	// states
	WELCOME,
	TEACHER_FLOW,
	STUDENT_FLOW,
	ENTER_PASSWORD,
	SET_NEW_PASSWORD,
	LOGIN_SUCCESS,
	// transitions
	SELECTED_TEACHER_FLOW,
	SELECTED_STUDENT_FLOW,
	// actions
	SHOW_ERROR,
	// CLEAR_USER,
	statechart,
} from './statechart'

/**
 * Login
 */

type Props = {
	transition: (string, ?{}) => void,
	classroomUid?: null | string,
	resetToken?: null | string,
	userUid?: null | string,
	error?: null | string,
}

/**
 * Login
 */

const Login = (props: Props) => {
	const { transition, error } = props
	// Factory function to make handlers easier to define
	const makeTransition = (t: string, data: {} = {}) => () => {
		transition(t, data)
	}

	console.log(props.machineState.value)
	const childProps = { ...props, makeTransition }
	return (
		<Centered>
			<Pane size="small">
				<Header1 align="center">Welcome to Mappslab!</Header1>
				<State is={WELCOME}>
					<Button onClick={makeTransition(SELECTED_STUDENT_FLOW)}>Find Your Classroom →</Button>
				</State>

				<Action is={SHOW_ERROR}>
					<p>{error}</p>
				</Action>

				<State is={STUDENT_FLOW}>
					<StudentLogin {...childProps} />
				</State>

				<State is={TEACHER_FLOW}>
					<TeacherLogin {...childProps} />
				</State>

				<State is={ENTER_PASSWORD}>
					<UserLogin {...childProps} />
				</State>

				<State is={SET_NEW_PASSWORD}>
					<SetNewPassword {...childProps} />
				</State>

				<State is={LOGIN_SUCCESS}>
					<LoginSuccess {...childProps} />
				</State>

				<State is={[WELCOME, STUDENT_FLOW]}>
					<Button onClick={makeTransition(SELECTED_TEACHER_FLOW)}>Login as a teacher</Button>
				</State>
				<State is={[TEACHER_FLOW]}>
					<Button onClick={makeTransition(SELECTED_STUDENT_FLOW)}>Login as a student</Button>
				</State>
			</Pane>
		</Centered>
	)
}

// <Action is={[ENTER_CLASSROOM_SELECT]}>
// 	<ClassroomsQuery>
// 		{({ data }) => <SelectClassroom transition={transition} classrooms={data.classrooms} />}
// 	</ClassroomsQuery>
// </Action>
// <Action is={[ENTER_STUDENT_SELECT]}>
// 	<ClassroomQuery variables={{ uid: classroomUid }}>
// 		{({ data }) => <SelectStudent classroom={data.classroom} transition={transition} />}
// 	</ClassroomQuery>
// </Action>
// <Action is={[ENTER_WELCOME, ENTER_STUDENT_SELECT]}>
// 	<Button secondary onClick={goToTeacherLogin}>
// 		Teacher Login
// 	</Button>
// </Action>

// <Action is={ENTER_USER_LOGIN}>
// 	<UserQuery variables={{ uid: userUid }}>
// 		{({ data }) => <UserLogin user={data.user} transition={transition} />}
// 	</UserQuery>
// </Action>

// <Action is={ENTER_SUCCESS}>
// 	<Link to="/dashboard">Go to your dashboard</Link>
// </Action>
// <Action is={[]}>
// 	YOU ARE A TEACHER
// 	<Header4 align="center">
// 		<button onClick={goBack} type="button">
// 			back
// 		</button>
// 	</Header4>
// </Action>

Login.defaultProps = {
	classroomUid: null,
	userUid: null,
	error: null,
	resetToken: null,
}

export default withStateMachine(statechart)(Login)
