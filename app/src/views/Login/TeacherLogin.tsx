import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { State, Action, Transition } from 'react-automata'
import {
	userQuery,
	UserQueryResponse,
	UserQueryArgs,
	useUserQuery,
} from '../../queries'
import { Form, Field } from '../../components/Forms'
import {
	FIND_TEACHER,
	SUBMIT,
	FETCHED_TEACHER,
	DISABLE_INPUT,
} from './statechart'

const { useEffect, useState } = React
/**
 * TeacherLogin
 */

type Props = {
	teacherEmail?: null | string
	transition: Transition
}

export const TeacherLogin = ({ teacherEmail, transition }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	// const result = useUserQuery({ email: teacherEmail })
	const [getUser, { data, loading, called }] = useLazyQuery<
		UserQueryResponse,
		UserQueryArgs
	>(userQuery)

	useEffect(() => {
		if (!called || !data || loading) return
		if (data?.user) {
			transition(FETCHED_TEACHER, { userUid: data.user.uid })
		}
	}, [data, loading, called])

	const handleSubmit = async (values: { email: string }) => {
		const { email } = values
		setIsLoading(true)
		transition(SUBMIT)
		getUser({ variables: { email } })
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
