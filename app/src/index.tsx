import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { createClient, Provider as UrqlProvider } from 'urql'
import { getCookie, VIEWER_COOKIE_TOKEN } from 'Utils/storage'
import { CurrentViewer } from './providers/CurrentViewer'
import ApolloWrapper from './services/Apollo'
import theme from './theme'
import { MappsLab } from './views/MappsLab'
import GlobalStyle from './theme/global'
import config from './config'

/**
 * GraphQL Setup
 */

const client = createClient({
	url: config.apiRoot,
	fetchOptions: (...args) => {
		const cookie = getCookie(VIEWER_COOKIE_TOKEN)
		const headers = cookie ? { Authorization: cookie } : {}
		return {
			headers,
		}
	},
})

if (window.localStorage) {
	window.localStorage.debug = 'app'
}

const renderApp = (Component: React.ComponentType) => {
	render(
		<AppContainer>
			<UrqlProvider value={client}>
				<CurrentViewer>
					<ApolloWrapper>
						<BrowserRouter>
							<ThemeProvider theme={theme}>
								<React.Fragment>
									<GlobalStyle />
									<Component />
								</React.Fragment>
							</ThemeProvider>
						</BrowserRouter>
					</ApolloWrapper>
				</CurrentViewer>
			</UrqlProvider>
		</AppContainer>,
		document.getElementById('root'),
	)
}

renderApp(MappsLab)

if ((module as any).hot) {
	;(module as any).hot.accept('./views/MappsLab.tsx', () => {
		// eslint-disable-next-line
		const NewApp = require('./views/MappsLab.tsx')
		renderApp(NewApp.MappsLab)
	})
}
