/* eslint-disable no-undef */
import React from 'react'
import { fireEvent } from 'react-testing-library'
import { render } from 'Jest/utils'

import Tabs from '../Tabs'

const normalTabs = (
	<Tabs initialTab="Nikes">
		<Tabs.Menu />
		<div data-testid="tabContainer">
			<Tabs.Tab name="Nikes">These bitches want Nikes</Tabs.Tab>
			<Tabs.Tab name="Ivy">I thought that I was dreaming</Tabs.Tab>
			<Tabs.Tab name="Pink + White">Yeah, yeah oh</Tabs.Tab>
		</div>
	</Tabs>
)

describe('Tabs Component', () => {
	it('Mounts Correctly', () => {
		/* Arrange */
		const { container } = render(normalTabs)
		/* Assert */
		expect(container).toMatchSnapshot()
	})

	it('should display a button for each tab', async () => {
		const { getByTestId } = render(normalTabs)
		expect(getByTestId('tabButton-Nikes')).toHaveTextContent('Nikes')
		expect(getByTestId('tabButton-Ivy')).toHaveTextContent('Ivy')
		expect(getByTestId('tabButton-Pink + White')).toHaveTextContent('Pink + White')
	})

	it('should only display one tab at a time', async () => {
		const { getByTestId } = render(normalTabs)
		expect(getByTestId('tabContainer')).toHaveTextContent('These bitches want Nikes')
		expect(getByTestId('tabContainer')).not.toHaveTextContent('I thought that I was dreaming')
	})

	it('should switch tabs when the TabMenu item is clicked', async () => {
		const { getByTestId } = render(normalTabs)
		const tab2button = getByTestId('tabButton-Ivy')
		fireEvent.click(tab2button)

		expect(getByTestId('tabContainer')).not.toHaveTextContent('These bitches want Nikes')
		expect(getByTestId('tabContainer')).toHaveTextContent('I thought that I was dreaming')
	})

	it('should throw an error if two tabs have the same name', async () => {
		const renderTabs = () =>
			render(
				<Tabs>
					<Tabs.Menu />
					<Tabs.Tab name="bad">bad!</Tabs.Tab>
					<Tabs.Tab name="bad">BAD!</Tabs.Tab>
				</Tabs>,
			)
		expect(renderTabs).toThrow('bad is not valid: all tab names must be unique')
	})

	it.skip('should remove the tab header when corresponding Tab unmounts', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
