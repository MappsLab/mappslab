// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { InspectorProvider } from 'Components/Inspector'
import { NotificationsProvider } from 'Components/Notifications'
import { QuestionProvider, QuestionDialog } from 'Components/Question'
import { BaseMap, MapEditor } from './Editor'
import Login from './Login'
import Sandbox from './Sandbox'

/**
 * MappsLab
 */

const apiKey = 'AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag'

const MappsLab = () => (
	<BaseMap
		APIKey={apiKey}
		render={(googleMap) => (
			<NotificationsProvider>
				<QuestionProvider>
					<QuestionDialog />
					<InspectorProvider>
						<Switch>
							<Route path="/sandbox" component={Sandbox} />
							<Route path="/login" exact component={Login} />
							<Route path="/dashboard" render={() => null} />
							<Route path="/maps/:uid" render={({ match }) => <MapEditor mapUid={match.params.uid} map={googleMap} />} />
							<Redirect to="/login" />
						</Switch>
					</InspectorProvider>
				</QuestionProvider>
			</NotificationsProvider>
		)}
	/>
)

export default MappsLab
