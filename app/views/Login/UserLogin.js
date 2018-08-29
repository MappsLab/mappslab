// @flow
import React from 'react'
import type { UserType } from 'Types'
import { FORM_ERROR } from 'final-form'
import type { transition as transitionType } from 'react-automata'
import { UserQuery, UserLoginMutation } from 'Queries/User'
import { Header2, Header4 } from 'Components/Text'
import { Form, Field } from 'Components/Forms'
import { Button } from 'Components/UI'
import { GO_BACK, LOGIN_SUCCESS } from './statechart'

/**
 * UserLogin
 */

type Props = {
	userUid: string,
	transition: transitionType,
}

const UserLogin = ({ userUid, transition, ...rest }: Props) => (
	<UserQuery variables={{ uid: userUid }}>
		{({ data: { user } }) => (
			<UserLoginMutation>
				{(loginUser, { loading }) => {
					const { uid, name } = user
					const handleBack = () => {
						transition(GO_BACK, { userUid: null, classroomUid: null })
					}

					const handleSubmit = async (variables) => {
						try {
							await loginUser({ variables })
							transition(LOGIN_SUCCESS)
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
						<React.Fragment>
							<Form disabled={loading} onSubmit={handleSubmit} initialValues={{ uid }} submitButtonText="login">
								<Header2>Hi, {name}</Header2>
								<Header4 color="middleGray">Please enter your password to log in.</Header4>
								<Field label="uid" name="uid" type="hidden" value="UID" />
								<Field label={false} name="password" type="password" />
							</Form>
							<Button secondary onClick={handleBack}>
								← Back to Classrooms
							</Button>
						</React.Fragment>
					)
				}}
			</UserLoginMutation>
		)}
	</UserQuery>
)

export default UserLogin
