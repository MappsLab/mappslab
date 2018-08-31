// @flow
import React from 'react'
import { FORM_ERROR } from 'final-form'
import type { transition as transitionType } from 'react-automata'
import { UserQuery, UserLoginMutation } from 'Queries/User'
import { Header2, Header4 } from 'Components/Text'
import { Form, Field } from 'Components/Forms'
import { SUCCESS, REQUIRE_RESET } from './statechart'

/**
 * UserLogin
 */

type Props = {
	userUid: null | string,
	transition: transitionType,
}

const UserLogin = ({ userUid, transition }: Props) => (
	<UserQuery variables={{ uid: userUid }} LoadingComponent={false}>
		{({ data, loading }) => (
			<UserLoginMutation>
				{(loginUser) => {
					const user = data.user || {}
					const { uid, name } = user

					const handleSubmit = async (variables) => {
						try {
							const result = await loginUser({ variables })
							const { resetToken } = result.data.loginViewer
							if (resetToken) transition(REQUIRE_RESET, { resetToken })
							transition(SUCCESS)
						} catch (e) {
							return {
								[FORM_ERROR]: e.message,
							}
						}
						// console.log(errors)
						// if (errors) return errors
						return undefined
					}
					return (
						<Form onSubmit={handleSubmit} initialValues={{ uid }} submitButtonText="login">
							{loading ? 'Loading...' : <Header2>Hi, {name}</Header2>}
							<Header4 color="middleGray">Please enter your password to log in.</Header4>
							<Field label="uid" name="uid" type="hidden" value="UID" />
							<Field label={false} name="password" type="password" />
						</Form>
					)
				}}
			</UserLoginMutation>
		)}
	</UserQuery>
)

// <Button secondary onClick={handleBack}>
// 	← Back to Classrooms
// </Button>
export default UserLogin
