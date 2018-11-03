// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { BaseMap, MapEditor } from 'Components/Maps'
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
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/sandbox" component={Sandbox} />
				<Route path="/maps/:uid" render={({ match }) => <MapEditor mapUid={match.params.uid} map={googleMap} />} />
				<Route render={() => <Redirect to="/login" />} />
			</Switch>
		)}
	/>
)

MappsLab.defaultProps = {
	viewer: null,
}

export default MappsLab
