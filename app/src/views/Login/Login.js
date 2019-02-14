// @flow
import React from 'react'
import { withStateMachine, State, Action } from 'react-automata'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import Pane from 'Components/Pane'
import { Header1 } from 'Components/Text'
import { Centered } from 'Components/Layout'
import { Button } from 'Components/Buttons'
import { CurrentViewerQuery } from 'Queries/Viewer'
import type { ViewerType } from 'Types/User'
import StudentLogin from './StudentLogin'
import TeacherLogin from './TeacherLogin'
import UserLogin from './UserLogin'
import LoginSuccess from './LoginSuccess'
import SetNewPassword from './SetNewPassword'
import {
	// states
	WELCOME,
	TEACHER_FLOW,
	STUDENT_FLOW,
	ENTER_PASSWORD,
	SET_NEW_PASSWORD,
	LOGIN_SUCCESS,
	// transitions
	WITH_VIEWER,
	NO_VIEWER,
	SELECTED_TEACHER_FLOW,
	SELECTED_STUDENT_FLOW,
	// actions
	SHOW_ERROR,
	// CLEAR_USER,
	statechart,
} from './statechart'

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

/**
 * Login
 */

type BaseProps = {
	transition: (string, ?{}) => void,
}

type Props = BaseProps & {
	viewer?: null | ViewerType,
	classroomUid?: null | string,
	resetToken?: null | string,
	userUid?: null | string,
	error?: null | string,
}

class Login extends React.Component<Props, State> {
	componentDidMount() {
		const { viewer, transition } = this.props
		const transitionName = viewer ? WITH_VIEWER : NO_VIEWER
		transition(transitionName)
	}

	transitionEvent = (t: string, data: {} = {}) => () => {
		this.props.transition(t, data)
	}

	render() {
		const childProps = this.props
		return (
			<Centered>
				<Pane size="normal" title="Welcome to Mappslab!">
					<Content>
						<State is={WELCOME}>
							<Button onClick={this.transitionEvent(SELECTED_STUDENT_FLOW)}>Find Your Classroom →</Button>
						</State>

						<Action is={SHOW_ERROR}>
							<p>{this.props.error}</p>
						</Action>

						<State is={STUDENT_FLOW}>
							<StudentLogin {...childProps} />
						</State>

						<State is={TEACHER_FLOW}>
							<TeacherLogin {...childProps} />
						</State>

						<State is={ENTER_PASSWORD}>{childProps.userUid !== null ? <UserLogin {...childProps} /> : null}</State>

						<State is={SET_NEW_PASSWORD}>
							<SetNewPassword {...childProps} />
						</State>

						<State is={LOGIN_SUCCESS}>
							<LoginSuccess {...childProps} />
						</State>

						<State is={[WELCOME, STUDENT_FLOW]}>
							<Button level="tertiary" onClick={this.transitionEvent(SELECTED_TEACHER_FLOW)}>
								Login as a teacher
							</Button>
						</State>
						<State is={[TEACHER_FLOW]}>
							<Button level="tertiary" onClick={this.transitionEvent(SELECTED_STUDENT_FLOW)}>
								Login as a student
							</Button>
						</State>
					</Content>
				</Pane>
			</Centered>
		)
	}
}

Login.defaultProps = {
	classroomUid: null,
	userUid: null,
	error: null,
	resetToken: null,
}

const Wrapper = (props: BaseProps) => (
	<CurrentViewerQuery>
		{({ data }) => {
			const viewer = data.currentViewer ? data.currentViewer.viewer : null
			return <Login {...props} viewer={viewer} />
		}}
	</CurrentViewerQuery>
)

export default withStateMachine(statechart)(Wrapper)
// withStateMachine(statechart)(Login)
