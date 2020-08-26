import React from 'react'
import { LoadScript, GoogleMap } from '@react-google-maps/api'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CurrentMapProvider } from '../providers/CurrentMap'
import { InspectorProvider } from '../components/Inspector'
import { NotificationsProvider } from '../components/Notifications'
import { QuestionProvider, QuestionDialog } from '../components/Question'
import { ViewerRoute } from '../components/Auth'
import { MapEditor } from './Editor'
import { Login } from './Login'
import { Sandbox } from './Sandbox'
import { Dashboard } from './Dashboard'

/**
 * MappsLab
 */

const apiKey = 'AIzaSyCOqxjWmEzFlHKC9w-iUZ5zL2rIyBglAag'

const defaultOptions = {
	center: { lat: 40.65, lng: -111.85 },
	zoom: 6,
	disableDefaultUI: true,
	zoomControlOptions: false,
	streetViewControlOptions: false,
	mapTypeControlOptions: {
		mapTypeIds: ['baseImage'],
	},
	mapContainerStyle: {
		width: '100%',
		height: '100%',
	},
}

export const MappsLab = () => (
	<LoadScript googleMapsApiKey={apiKey}>
		<GoogleMap {...defaultOptions}>
			<CurrentMapProvider>
				<NotificationsProvider>
					<QuestionProvider>
						<QuestionDialog />
						<InspectorProvider>
							<Switch>
								<Route path="/sandbox" component={Sandbox} />
								<Route path="/login" exact component={Login} />
								<ViewerRoute path="/dashboard" component={Dashboard} />
								<Route
									path="/maps/:uid"
									render={({ match }) => (
										<MapEditor mapUid={match.params.uid} />
									)}
								/>
								<Redirect to="/login" />
							</Switch>
						</InspectorProvider>
					</QuestionProvider>
				</NotificationsProvider>
			</CurrentMapProvider>
		</GoogleMap>
	</LoadScript>
)
