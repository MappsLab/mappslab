import React from 'react'
import { Field as FinalFormField } from 'react-final-form'
import { composeValidators, required, ValidatorFunction } from './validators'
import { FieldWrapper, Label, HelpText, Input, ValidationError } from './styles'

interface Props {
	label: false | string
	name: string
	validate?: ValidatorFunction
	helpText?: string
	type?: string
	required?: boolean
	value?: string
}

export const Field = (props: Props) => {
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
				<FieldWrapper hidden={props.type === 'hidden'}>
					{props.label && (
						<Label
							active={meta.active}
							aria-labelledby={input.name}
							htmlFor={input.name}
							required={props.required}
						>
							{props.label}
						</Label>
					)}
					<Input
						id={input.name}
						{...input}
						type={props.type}
						active={meta.active}
						required={props.required}
					/>
					<HelpText>{props.helpText}</HelpText>
					{meta.error && meta.touched ? (
						<ValidationError>{meta.error}</ValidationError>
					) : null}
					{meta.submitError && !meta.dirtySinceLastSubmit ? (
						<ValidationError>{meta.submitError}</ValidationError>
					) : null}
				</FieldWrapper>
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
