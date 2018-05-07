// @flow
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import MappsLab from './views/MappsLab'
import './styles/global'

render(
	<AppContainer>
		<BrowserRouter>
			<MappsLab />
		</BrowserRouter>
	</AppContainer>,
	document.getElementById('root'),
)
