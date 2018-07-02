// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ViewerRoute } from 'App/components/Auth'
import Classrooms from './Login/Classrooms'
import Classroom from './Login/Classroom'
import Dashboard from './Dashboard'
import Editor from './Editor'

/**
 * MappsLab
 */

const MappsLab = () => (
	<Switch>
		<Route path="/login/classrooms/:slug" render={({ match }) => <Classroom slug={match.params.slug} />} />
		<Route path="/login/classrooms" component={Classrooms} />
		<Route path="/maps/:uid" render={({ match }) => <Editor uid={match.params.uid} />} />
		<ViewerRoute path="/dashboard" render={({ viewer }) => <Dashboard viewer={viewer} />} />
		<Route render={() => <Redirect to="/login/classrooms" />} />
	</Switch>
)

MappsLab.defaultProps = {
	viewer: null,
}

export default MappsLab
