import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import ApolloWrapper from './services/Apollo'

import MappsLab from './views/MappsLab'
import './theme/global'

render(
	<AppContainer>
		<ApolloWrapper>
			<BrowserRouter>
				<MappsLab />
			</BrowserRouter>
		</ApolloWrapper>
	</AppContainer>,
	document.getElementById('root'),
)
