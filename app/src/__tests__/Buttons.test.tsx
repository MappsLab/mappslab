/* eslint-disable no-undef */
import React from 'react'
import { render } from '../test-utils'
import { Button } from '../components/Buttons'
import { StaticRouter } from 'react-router-dom'

const buttonText = 'Click Me!'

describe('Button Component', () => {
	it('Mounts Correctly', () => {
		const { container } = render(<Button>{buttonText}</Button>)
		expect(container).toMatchSnapshot()
	})

	it('Renders as a <Link> if given a `to` prop', () => {
		const { container } = render(
			<StaticRouter location="/" context={{}}>
				<Button to="/path">Go</Button>
			</StaticRouter>,
		)
		expect(container.getElementsByTagName('a')).toHaveLength(1)
	})
})
