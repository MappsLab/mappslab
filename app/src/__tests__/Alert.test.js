// @flow
/* eslint-disable no-undef */
import * as React from 'react'
import { fireEvent } from 'react-testing-library'
import { render } from 'Jest/utils'
import { AlertProvider, AlertConsumer } from 'Components/Alert'
import type { ContextValues } from 'Components/Alert/AlertProvider'

const AlertWrapper = ({ children }: { children: (ContextValues) => React.Node }) => (
	<AlertProvider>
		<AlertConsumer>{children}</AlertConsumer>
	</AlertProvider>
)

const BasicAlert = () => (
	<AlertWrapper>
		{({ createAlert }: ContextValues) => (
			<button
				type="button"
				data-testid="button"
				onClick={() => {
					createAlert({ message: 'are you sure?', buttons: [{ label: 'YES' }, { label: 'NO', level: 'secondary' }] })
				}}
			>
				click?
			</button>
		)}
	</AlertWrapper>
)

describe('Alert Component', () => {
	it('Mounts Correctly', () => {
		const { container } = render(<BasicAlert />)
		expect(container).toMatchSnapshot()
	})

	it('should render its children', async () => {
		const { getByTestId } = render(<BasicAlert />)
		expect(getByTestId('button')).toHaveTextContent('click?')
	})

	it('should not render an <Alert> by default', async () => {
		const { queryByTestId } = render(<BasicAlert />)
		expect(queryByTestId('alert')).toBeFalsy()
	})

	it('should render an <Alert> when a consumer calls `createAlert', async () => {
		const { queryByTestId, queryByText, getByTestId } = render(<BasicAlert />)
		const button = getByTestId('button')
		expect(queryByTestId('alert')).toBeFalsy()
		fireEvent.click(button)
		expect(queryByTestId('alert')).toBeTruthy()
		expect(queryByText('are you sure?')).toBeTruthy()
		expect(queryByText('YES')).toBeTruthy()
		expect(queryByText('NO')).toBeTruthy()
	})

	it.skip('should supply a "OK" button that returns `true` by default', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should display custom buttons when given `actions` config', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should return the value specified in the `actions.[n].returns` config', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should call the function specified in the `actions.[n].returns` config', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
