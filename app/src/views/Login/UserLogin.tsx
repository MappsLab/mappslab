import React, { useEffect } from 'react'
import { transition as transitionType } from 'react-automata'
import { useUserQuery } from '../../queries/user'
import { Header2, Header4 } from '../../components/Text'
import { Form, Field, ErrorMessage } from '../../components/Forms'
import { useCurrentViewer, Credentials } from '../../providers/CurrentViewer'
import { SUCCESS, REQUIRE_RESET } from './statechart'

/**
 * UserLogin
 */

interface Props {
	transition: transitionType
	uid: string
}

export const UserLogin = ({ uid, transition }: Props) => {
	const { loginUser, loading, viewer, error, resetToken } = useCurrentViewer()
	const result = useUserQuery({ uid })
	const user = result.data?.user

	useEffect(() => {
		if (resetToken) {
			transition(REQUIRE_RESET)
		} else if (viewer) {
			transition(SUCCESS)
		}
	}, [viewer, resetToken])

	const handleSubmit = (variables: Credentials) => loginUser(variables)

	if (!user) return <Header4>Could not find user</Header4>

	return (
		<Form
			disabled={loading}
			onSubmit={handleSubmit}
			initialValues={{ uid }}
			submitButtonText="login"
		>
			{viewer ? 'Loading...' : <Header2>Hi, {user.name}</Header2>}
			<Header4>Please enter your password to log in.</Header4>
			<Field label="uid" name="uid" type="hidden" value="UID" />
			<Field label="Password" name="password" type="password" />
			{error ? (
				<>
					<ErrorMessage>
						{error?.message || 'Sorry, there was an error'}
					</ErrorMessage>
					<Header4>
						If you forgot your password, ask your teacher to reset it.
					</Header4>
				</>
			) : null}
		</Form>
	)
}
