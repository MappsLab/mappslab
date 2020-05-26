import * as React from 'react'
import * as ReactDom from 'react-dom'
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

ReactDom.render(
	<AppContainer>
		<ApolloWrapper>
			<CurrentViewer>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<React.Fragment>
							<GlobalStyle />
							<MappsLab />
						</React.Fragment>
					</ThemeProvider>
				</BrowserRouter>
			</CurrentViewer>
		</ApolloWrapper>
	</AppContainer>,
	document.getElementById('root'),
)
