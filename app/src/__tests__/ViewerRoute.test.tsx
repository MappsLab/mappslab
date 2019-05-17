/* eslint-disable no-undef */
import * as React from 'react'
import { render } from 'react-testing-library'
import { StaticRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ViewerRoute } from 'Components/Auth/ViewerRoute'
// import mockClient from '../__tests__/setup/apolloMockClient'

// const Wrapper = (path = '/', mocks = defaultMocks) => ({ children }) => (
// 	<StaticRouter path={path} context={{}}>
// 		<ApolloProvider>{children}</ApolloProvider>
// 	</StaticRouter>
// )

describe('ViewerRoute Component', () => {
	it.skip('Mounts Correctly', () => {
		/* Arrange */
		const { container, debug } = render(
			<StaticRouter location="/path">
				<ViewerRoute path="/path">
					<p data-test-id="protected">Protected</p>
				</ViewerRoute>
			</StaticRouter>,
		)

		debug()
		/* Act */

		/* Assert */
		// expect(wrapper).toMatchSnapshot()
	})
})
