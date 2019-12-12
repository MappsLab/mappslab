import React, { useEffect } from 'react'
import { transition as transitionType } from 'react-automata'
import { UserType } from '../../types'
import { UserQuery } from '../../queries/User'
import { Header2, Header4 } from '../../components/Text'
import { Form, Field, ErrorMessage } from '../../components/Forms'
import { useCurrentViewer, Credentials } from '../../providers/CurrentViewer'
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
	const { loginUser, loading, viewer, error, resetToken } = useCurrentViewer()
	const { uid, name } = user

	useEffect(() => {
		if (resetToken) {
			transition(REQUIRE_RESET)
		} else if (viewer) {
			transition(SUCCESS)
		}
	}, [viewer, resetToken])

	const handleSubmit = (variables: Credentials) => loginUser(variables)

	return (
		<Form disabled={loading} onSubmit={handleSubmit} initialValues={{ uid }} submitButtonText="login">
			{viewer ? 'Loading...' : <Header2>Hi, {name}</Header2>}
			<Header4>Please enter your password to log in.</Header4>
			<Field label="uid" name="uid" type="hidden" value="UID" />
			<Field label="Password" name="password" type="password" />
			{error ? (
				<>
					<ErrorMessage>{error.message}</ErrorMessage>
					<Header4>If you forgot your password, ask your teacher to reset it.</Header4>
				</>
			) : null}
		</Form>
	)
}

interface WrapperProps extends BaseProps {
	userUid?: string
}

const WithUser = ({ userUid, ...props }: WrapperProps) => {
	if (!userUid) throw new Error('You must supply a `userUid`')
	return <UserQuery variables={{ uid: userUid }}>{({ data }) => <UserLogin user={data.user} {...props} />}</UserQuery>
}

export default WithUser
