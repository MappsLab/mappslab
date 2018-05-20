// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Classrooms from '../Classrooms'
import Classroom from '../Classroom'

/**
 * MappsLab
 */

const MappsLab = () => (
	<Switch>
		<Route path="/classrooms/:slug" render={({ match }) => <Classroom slug={match.params.slug} />} />
		<Route path="/classrooms" component={Classrooms} />
		<Route render={() => <Redirect to="/classrooms" />} />
	</Switch>
)

export default MappsLab
