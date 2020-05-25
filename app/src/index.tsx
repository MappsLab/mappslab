import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CurrentViewer } from './providers/CurrentViewer'
import { ApolloWrapper } from './services/Apollo'
import theme from './theme'
import { MappsLab } from './views/MappsLab'
import GlobalStyle from './theme/global'

/**
 * GraphQL Setup
 */

const renderApp = (Component: React.ComponentType) => {
	render(
		<AppContainer>
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
