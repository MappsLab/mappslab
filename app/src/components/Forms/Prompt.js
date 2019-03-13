// @flow
import * as React from 'react'
import Form from './Form'
import Field from './Field'

type PromptProps = {
	name: string,
	label: string,
	answer: (any) => Promise<void>,
	type?: string,
}

const Prompt = ({ name, label, answer, type }: PromptProps) => (
	<Form onSubmit={answer}>
		<Field name={name} label={label} type={type} />
	</Form>
)

Prompt.defaultProps = {
	type: 'input',
}

export default Prompt
