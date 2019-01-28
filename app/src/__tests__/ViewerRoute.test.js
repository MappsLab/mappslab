/* eslint-disable no-undef */
import * as React from 'react'
import { render } from 'react-testing-library'
import { StaticRouter } from 'react-router-dom'
import ViewerRoute from 'Components/Auth/ViewerRoute'

describe('ViewerRoute Component', () => {
	it('Mounts Correctly', () => {
		/* Arrange */
		const { container, getByTestId } = render(
			<StaticRouter location="/path">
				<ViewerRoute path="/path">
					<p>Protected</p>
				</ViewerRoute>
			</StaticRouter>,
		)
		/* Act */

		/* Assert */
		expect(wrapper).toMatchSnapshot()
	})
})
