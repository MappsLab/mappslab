import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { InspectorProvider } from '../components/Inspector'
import { NotificationsProvider } from '../components/Notifications'
import { QuestionProvider, QuestionDialog } from '../components/Question'
import { ViewerRoute } from '../components/Auth'
import { BaseMap, MapEditor } from './Editor'
import Login from './Login'
import Sandbox from './Sandbox'
import { Dashboard } from './Dashboard'

/**
 * MappsLab
 */

const apiKey = 'AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag'

export const MappsLab = () => (
	<BaseMap
		APIKey={apiKey}
		render={() => (
			<NotificationsProvider>
				<QuestionProvider>
					<QuestionDialog />
					<InspectorProvider>
						<Switch>
							<Route path="/sandbox" component={Sandbox} />
							<Route path="/login" exact component={Login} />
							<ViewerRoute path="/dashboard" component={Dashboard} />
							<Route path="/maps/:uid" render={({ match }) => <MapEditor mapUid={match.params.uid} />} />
							<Redirect to="/login" />
						</Switch>
					</InspectorProvider>
				</QuestionProvider>
			</NotificationsProvider>
		)}
	/>
)
