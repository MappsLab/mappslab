/* eslint-disable no-undef */
import React from 'react'
import { render } from 'react-testing-library'

import { Button } from 'Components/Buttons'

const buttonText = 'Click Me!'

describe('Button Component', () => {
	it('Mounts Correctly', () => {
		const { container } = render(<Button>{buttonText}</Button>)
		expect(container).toMatchSnapshot()
	})
})
