// @flow
import React from 'react'
import { FORM_ERROR } from 'final-form'
import type { transition as transitionType } from 'react-automata'
import type { UserType } from 'Types/User'
import { UserLoginMutation, UserQuery } from 'Queries/User'
import { Header2, Header4 } from 'Components/Text'
import { Form, Field } from 'Components/Forms'
import { SUCCESS, REQUIRE_RESET } from './statechart'

/**
 * UserLogin
 */

type BaseProps = {
	transition: transitionType,
}

type Props = BaseProps & {
	user: UserType,
}

const UserLogin = ({ user, transition }: Props) =>
	user ? (
		<UserLoginMutation>
			{(loginUser, { loading }) => {
				const { uid, name } = user

				const handleSubmit = async (variables) => {
					try {
						const result = await loginUser({ variables })
						const { resetToken } = result.data.loginViewer
						if (resetToken) {
							transition(REQUIRE_RESET, { resetToken })
						} else {
							transition(SUCCESS)
						}
					} catch (e) {
						return {
							[FORM_ERROR]: e.message,
						}
					}
					return undefined
				}

				return (
					<Form disabled={loading} onSubmit={handleSubmit} initialValues={{ uid }} submitButtonText="login">
						{loading ? 'Loading...' : <Header2>Hi, {name}</Header2>}
						<Header4>Please enter your password to log in.</Header4>
						<Field label="uid" name="uid" type="hidden" value="UID" />
						<Field label="Password" name="password" type="password" />
					</Form>
				)
			}}
		</UserLoginMutation>
	) : (
		<Header4>No user was supplied</Header4>
	)

type WrapperProps = BaseProps & {
	userUid: string,
}

const WithUser = ({ userUid, ...props }: WrapperProps) => (
	<UserQuery variables={{ uid: userUid }}>{({ data }) => <UserLogin user={data.user} {...props} />}</UserQuery>
)

export default WithUser
