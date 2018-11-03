import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import EntityProvider from 'Components/EntityBrowser/Provider'
import ApolloWrapper from './services/Apollo'

import MappsLab from './views/MappsLab'

render(
	<AppContainer>
		<ApolloWrapper>
			<BrowserRouter>
				<EntityProvider>
					<MappsLab />
				</EntityProvider>
			</BrowserRouter>
		</ApolloWrapper>
	</AppContainer>,
	document.getElementById('root'),
)
