// @flow
import React from 'react'
import styled from 'styled-components'
import { Field as FinalFormField } from 'react-final-form'
import { composeValidators, required } from './validators'
import { fieldWrapperStyles, labelStyles, helpTextStyles, inputStyles, validationErrorStyles } from './styles'

export const Wrapper = styled.div`
	${fieldWrapperStyles};
`

export const Label = styled.label`
	${labelStyles};
`

export const HelpText = styled.h4`
	${helpTextStyles};
`

const Input = styled.input`
	${inputStyles};
`

export const ValidationError = styled.h4`
	${validationErrorStyles};
`

type Props = {
	label: false | string,
	name: string,
	validate?: Function | Array<Function>,
	helpText?: string,
	type?: string,
	required?: boolean,
}

const Field = (props: Props) => {
	const validators = props.validate
		? props.required
			? composeValidators(required, props.validate)
			: composeValidators(props.validate)
		: undefined
	return (
		<FinalFormField
			name={props.name}
			validate={validators}
			render={({ input, meta }) => (
				<Wrapper hidden={props.type === 'hidden'}>
					{props.label && <Label required={props.required}>{props.label}</Label>}
					<Input {...input} type={props.type} active={meta.active} />
					<HelpText>{props.helpText}</HelpText>
					{meta.error && meta.touched ? <ValidationError>{meta.error}</ValidationError> : null}
					{meta.submitError && !meta.dirtySinceLastSubmit ? <ValidationError>{meta.submitError}</ValidationError> : null}
				</Wrapper>
			)}
		/>
	)
}

Field.defaultProps = {
	type: 'input',
	required: false,
	helpText: '',
	validate: () => undefined,
}

export default Field
