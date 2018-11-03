// @flow
import React from 'react'
import type { Node } from 'react'
import { Form as FinalForm } from 'react-final-form'
import styled from 'styled-components'
import { SubmitButton } from '../UI/Buttons'
import { formWrapperStyles, formMessageStyles, formErrorStyles } from './styles'

const FormWrapper = styled.form`
	${formWrapperStyles};
`

export const FormMessage = styled.h4`
	${formMessageStyles};
`

export const FormError = styled.h4`
	${formErrorStyles};
`

/**
 * Form
 */

type Props = {
	onSubmit: (Object) => Promise<Object | void | Error>,
	message?: string | null,
	errorMessage?: string | null,
	submitButtonText?: string,
	showSubmitButton?: boolean,
	disabled?: boolean,
	validate?: (values: Object) => Object | Promise<Object>,
	children?: Node | Array<Node>,
	render?: (formProps: Object) => Node | Array<Node>,
}

const Form = (props: Props) => (
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
					{message ? <FormMessage>{message}</FormMessage> : null}
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

export default Form
