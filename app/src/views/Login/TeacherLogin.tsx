import React from 'react'
import { State, Action, Transition } from 'react-automata'
import { useUserQuery } from 'Queries'
import { Form, Field } from 'Components/Forms'
import {
	FIND_TEACHER,
	SUBMIT,
	FETCHED_TEACHER,
	DISABLE_INPUT,
} from './statechart'

const { useState } = React
/**
 * TeacherLogin
 */

type Props = {
	teacherEmail?: null | string
	transition: Transition
}

export const TeacherLogin = ({ teacherEmail, transition }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const { data, refetch } = useUserQuery({ email: teacherEmail })
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
				render={(disabled: boolean) => (
					<Form
						disabled={isLoading || disabled}
						onSubmit={handleSubmit}
						initialValues={{ email: teacherEmail || '' }}
					>
						<Field label="Email" name="email" type="email" />
					</Form>
				)}
			/>
		</State>
	)
}

TeacherLogin.defaultProps = {
	teacherEmail: null,
}
