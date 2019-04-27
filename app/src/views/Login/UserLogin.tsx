import React from 'react'
import { FORM_ERROR } from 'final-form'
import { transition as transitionType } from 'react-automata'
import { UserType } from '../../types'
import { UserLoginMutation, UserQuery } from '../../queries/User'
import { Header2, Header4 } from '../../components/Text'
import { Form, Field, ErrorMessage } from '../../components/Forms'
import { useCurrentViewer } from '../../providers/CurrentViewer'
import { SUCCESS, REQUIRE_RESET } from './statechart'

/**
 * UserLogin
 */

interface BaseProps {
	transition: transitionType
}

interface Props extends BaseProps {
	user: UserType
}

const UserLogin = ({ user, transition }: Props) => {
	const { loginUser, loading, viewer, error } = useCurrentViewer()
	const { uid, name } = user
	console.log(error, viewer)

	const handleSubmit = async (variables) => {
		const result = await loginUser(variables)
		// try {
		console.log(result)
		// 	const result = await loginUser({ variables })
		// 	const { resetToken } = result.data.loginViewer
		// 	if (resetToken) {
		// 		transition(REQUIRE_RESET, { resetToken })
		// 	} else {
		// 		transition(SUCCESS)
		// 	}
		// } catch (e) {
		// 	return {
		// 		[FORM_ERROR]: e.message,
		// 	}
		// }
		return undefined
	}

	return (
		<Form disabled={loading} onSubmit={handleSubmit} initialValues={{ uid }} submitButtonText="login">
			{loading ? 'Loading...' : <Header2>Hi, {name}</Header2>}
			<Header4>Please enter your password to log in.</Header4>
			<Field label="uid" name="uid" type="hidden" value="UID" />
			<Field label="Password" name="password" type="password" />
			{error ? <ErrorMessage>{error.message}</ErrorMessage> : null}
		</Form>
	)
}

interface WrapperProps extends BaseProps {
	userUid: string
}

const WithUser = ({ userUid, ...props }: WrapperProps) => (
	<UserQuery variables={{ uid: userUid }}>{({ data }) => <UserLogin user={data.user} {...props} />}</UserQuery>
)

export default WithUser
