// @flow
import React from 'react'
import type { Transition } from 'react-automata'
import { FORM_ERROR } from 'final-form'
import { Header4 } from 'Components/Text'
import { Form, Field } from 'Components/Forms'
import { ResetPasswordMutation } from 'Queries/User'
import { SUCCESS } from './statechart'

/**
 * SetNewPassword
 */

type Props = {
	resetToken: string | null,
	transition: Transition,
}

const SetNewPassword = ({ resetToken, transition }: Props) =>
	resetToken ? (
		<ResetPasswordMutation>
			{(resetPassword, { loading }) => {
				const handleSubmit = async (variables) => {
					try {
						await resetPassword({ variables })
						transition(SUCCESS)
					} catch (e) {
						return {
							[FORM_ERROR]: e.message,
						}
					}
				}
				return (
					<Form disabled={loading} onSubmit={handleSubmit} initialValues={{ resetToken }}>
						<Header4>Create a new password</Header4>
						<Field label="resetToken" name="resetToken" type="hidden" value="resetPasswordToken" />
						<Field label="New Password" name="password" type="password" />
					</Form>
				)
			}}
		</ResetPasswordMutation>
	) : null

export default SetNewPassword
