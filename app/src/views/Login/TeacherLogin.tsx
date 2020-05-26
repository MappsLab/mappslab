import React from 'react'
import { State, Action, Transition } from 'react-automata'
import { useUserQuery } from '../../queries'
import { Form, Field } from '../../components/Forms'
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
	const { refetch } = useUserQuery({ email: teacherEmail })

	const handleSubmit = async ({ email }) => {
		setIsLoading(true)
		transition(SUBMIT)
		const { data } = await refetch({ email })
		if (data?.user) {
			transition(FETCHED_TEACHER, { userUid: data.user.uid })
		}
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
