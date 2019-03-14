// @flow
import React from 'react'
import { State, Action } from 'react-automata'
import type { transition as transitionType } from 'react-automata'
import { UserQuery } from 'Queries'
import { Form, Field } from 'Components/Forms'
import {
	// states
	FIND_TEACHER,
	// actions
	SUBMIT,
	FETCHED_TEACHER,
	DISABLE_INPUT,
} from './statechart'

const { useState } = React
/**
 * TeacherLogin
 */

type Props = {
	teacherEmail?: null | string,
	transition: transitionType,
}

const TeacherLogin = ({ teacherEmail, transition }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	return (
		<UserQuery delayQuery variables={{ email: teacherEmail }}>
			{({ refetch, data }) => {
				const handleSubmit = async ({ email }) => {
					setIsLoading(true)
					transition(SUBMIT)
					await refetch({ email })
				}

				if (data && data.user) {
					transition(FETCHED_TEACHER, { userUid: data.user.uid })
					return null
				}

				return (
					<State is={[FIND_TEACHER]}>
						<Action is={DISABLE_INPUT}>DISABLED</Action>
						<Action
							is={DISABLE_INPUT}
							render={(disabled) => (
								<Form disabled={isLoading || disabled} onSubmit={handleSubmit} initialValues={{ email: teacherEmail }}>
									<Field label="Email" name="email" type="email" />
								</Form>
							)}
						/>
					</State>
				)
			}}
		</UserQuery>
	)
}

TeacherLogin.defaultProps = {
	teacherEmail: null,
}

export default TeacherLogin
