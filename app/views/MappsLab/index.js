// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Classrooms from '../Classrooms'

/**
 * MappsLab
 */

const MappsLab = () => (
	<Switch>
		<Route path="/classrooms" component={Classrooms} />
		<Route render={() => <Redirect to="/classrooms" />} />
	</Switch>
)

export default MappsLab
