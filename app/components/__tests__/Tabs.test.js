/* eslint-disable no-undef */
import React from 'react'
import { render } from 'react-testing-library'

import Tabs from '../Tabs'

describe('Tabs Component', () => {
	it.skip('Mounts Correctly', () => {
		/* Arrange */
		const { container, getByTestId } = render(<Tabs />)
		/* Act */

		/* Assert */
		expect(wrapper).toMatchSnapshot()
	})

	it.skip('should only display one tab at a time', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should switch tabs when the TabMenu item is clicked', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should throw an error if two tabs have the same name', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should remove the tab header when corresponding Tab unmounts', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
