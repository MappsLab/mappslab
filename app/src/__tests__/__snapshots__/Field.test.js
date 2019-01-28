import * as React from 'react'
import { fireEvent } from 'react-testing-library'
import { render } from 'Jest/utils'
import { mustBeNumber, minMaxValue } from 'Components/Forms/validators'
import { Form, Field } from 'Components/Forms'

describe('Field Component', () => {
	it('displays the label and help text', () => {
		/* Arrange */
		const rendered = render(
			<Form onSubmit={() => {}}>
				<Field label="Your Password" name="password" type="password" helpText="enter your password" />
			</Form>,
		)
		const { container, getByText } = rendered
		const label = container.getElementsByTagName('label')[0]
		expect(label).toBeTruthy()
		expect(getByText('Your Password')).toBeTruthy()
		expect(getByText('enter your password')).toBeTruthy()
	})

	it.skip('displays validation errors', () => {
		const { container, getByText, getByLabelText, debug } = render(
			<Form
				onSubmit={() => {
					throw new Error('!')
				}}
			>
				<Field label="Your Age" name="age" validate={[mustBeNumber, minMaxValue(18, 100)]} />
			</Form>,
		)
		fireEvent.change(getByLabelText('Your Age'), 'abc')

		fireEvent.click(getByText('Submit'))
		debug()
	})
})
