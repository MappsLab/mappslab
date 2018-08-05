import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import ApolloWrapper from './services/Apollo'
import theme from './theme'
import MappsLab from './views/MappsLab'
import './theme/global'

if (window.localStorage) {
	window.localStorage.debug = 'app'
}

const renderApp = (Component) => {
	render(
		<AppContainer>
			<ApolloWrapper>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<Component />
					</ThemeProvider>
				</BrowserRouter>
			</ApolloWrapper>
		</AppContainer>,
		document.getElementById('root'),
	)
}

renderApp(MappsLab)

if (module.hot) {
	module.hot.accept('./views/MappsLab.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./views/MappsLab.js').default
		renderApp(NewApp)
	})
}
