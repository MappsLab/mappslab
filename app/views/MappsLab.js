// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ViewerRoute } from 'Components/Auth'
import Dashboard from './Dashboard'
import Editor from './Editor'
import Login from './Login'

/**
 * MappsLab
 */

const MappsLab = () => (
	<Switch>
		<Route path="/login" component={Login} />
		<Route path="/maps/:uid" render={({ match }) => <Editor uid={match.params.uid} />} />
		<ViewerRoute path="/dashboard" render={({ viewer }) => <Dashboard viewer={viewer} />} />
		<Route render={() => <Redirect to="/login" />} />
	</Switch>
)

MappsLab.defaultProps = {
	viewer: null,
}

export default MappsLab
