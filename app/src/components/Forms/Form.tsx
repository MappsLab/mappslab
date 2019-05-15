import React from 'react'
import { Form as FinalForm } from 'react-final-form'
import { Header4 } from '../Text'
import { SubmitButton } from '../Buttons'
import { FormWrapper, FormError } from './styles'

/**
 * Form
 */

type Props = {
	onSubmit: (Object) => Promise<Object | void | Error>
	message?: string | null
	errorMessage?: string | null
	submitButtonText?: string
	showSubmitButton?: boolean
	disabled?: boolean
	validate?: (values: Object) => Object | Promise<Object>
	children?: React.ReactNode
	render?: (formProps: Object) => React.ReactNode
	initialValues?: { [key: string]: string | number }
}

export const Form = (props: Props) => (
	<FinalForm
		{...props}
		render={(formProps) => {
			const { handleSubmit, submitError, pristine, submitting, submitErrors, submitFailed, dirtySinceLastSubmit } = formProps
			const error = props.errorMessage || submitError
			const { message } = props
			const submitFailedAndNotDirty = submitFailed && submitErrors && !dirtySinceLastSubmit
			const buttonDisabled = props.disabled || pristine || submitFailedAndNotDirty || submitting || false
			return (
				<FormWrapper disabled={props.disabled} onSubmit={handleSubmit}>
					{props.children || (props.render && props.render(formProps))}
					{message ? <Header4>{message}</Header4> : null}
					{error && !submitting && !dirtySinceLastSubmit ? <FormError>{error}</FormError> : null}
					{props.showSubmitButton && (
						<SubmitButton wide disabled={buttonDisabled}>
							{props.submitButtonText}
						</SubmitButton>
					)}
				</FormWrapper>
			)
		}}
	/>
)

Form.defaultProps = {
	message: undefined,
	errorMessage: undefined,
	submitButtonText: 'Submit',
	disabled: false,
	showSubmitButton: true,
	children: undefined,
	render: () => null,
	validate: () => ({}),
}
