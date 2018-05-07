import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import MappsLab from './views/MappsLab'
import './styles/global'

const renderApp = (Component) => {
	render(
		<AppContainer>
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		</AppContainer>,
		document.getElementById('root'),
	)
}

renderApp(MappsLab)

if (module.hot) {
	module.hot.accept('./views/MappsLab/index.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./views/MappsLab/index.js').default
		renderApp(NewApp)
	})
}
