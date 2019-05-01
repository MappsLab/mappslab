// @flow
import React, { useEffect } from 'react'
import { Transition } from 'react-automata'
import { FORM_ERROR } from 'final-form'
import { Header4 } from '../../components/Text'
import { Form, Field } from '../../components/Forms'
import { ResetPasswordMutation } from '../../queries/User'
import { SUCCESS, LOGOUT } from './statechart'
import { useCurrentViewer, Credentials, ResetCredentials } from '../../providers/CurrentViewer'

/**
 * SetNewPassword
 */

type Props = {
	resetToken: string | null
	transition: Transition
}

const SetNewPassword = ({ transition }: Props) => {
	const { viewer, resetToken, resetPassword, loading } = useCurrentViewer()

	useEffect(() => {
		if (viewer) transition(SUCCESS)
		if (!resetToken) transition(LOGOUT)
	}, [])

	if (!resetToken) return null
	const handleSubmit = async (variables: ResetCredentials) => {
		const result = await resetPassword(variables)
		if (result.success === false) return { [FORM_ERROR]: result.message }
		transition(SUCCESS)
	}

	return (
		<Form disabled={loading} onSubmit={handleSubmit} initialValues={{ resetToken }}>
			<Header4>Create a new password</Header4>
			<Field label="resetToken" name="resetToken" type="hidden" value="resetPasswordToken" />
			<Field label="New Password" name="password" type="password" />
		</Form>
	)
}

export default SetNewPassword
