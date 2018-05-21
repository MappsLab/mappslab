import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import ApolloWrapper from './services/Apollo'

import MappsLab from './views/MappsLab'
import './styles/global'

if (window.localStorage) {
	window.localStorage.debug = 'app'
}

const renderApp = (Component) => {
	render(
		<AppContainer>
			<ApolloWrapper>
				<BrowserRouter>
					<Component />
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
