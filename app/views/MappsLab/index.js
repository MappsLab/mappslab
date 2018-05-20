// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Classrooms from '../Login/Classrooms'
import Classroom from '../Login/Classroom'

/**
 * MappsLab
 */

const MappsLab = () => (
	<Switch>
		<Route path="/login/classrooms/:slug" render={({ match }) => <Classroom slug={match.params.slug} />} />
		<Route path="/login/classrooms" component={Classrooms} />
		<Route render={() => <Redirect to="/login/classrooms" />} />
	</Switch>
)

export default MappsLab
