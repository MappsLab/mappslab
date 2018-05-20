// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withCurrentViewerQuery } from 'App/queries'
import Classrooms from './Login/Classrooms'
import Classroom from './Login/Classroom'
import type { ViewerType } from '../types'
import Dashboard from './Dashboard'
import { Loading } from 'App/components/Loading'

/**
 * MappsLab
 */

type Props = {
	viewer?: null | ViewerType,
	loading: boolean,
}

const MappsLab = ({ viewer, loading }: Props) => (
	<Switch>
		<Route path="/login/classrooms/:slug" render={({ match }) => <Classroom slug={match.params.slug} />} />
		<Route path="/login/classrooms" component={Classrooms} />
		<Route
			path="/dashboard"
			render={() =>
				loading ? (
					// If the currentViewerQuery is still loading,
					<Loading />
				) : // Otherwise, if there is a viewr,
				viewer ? (
					// Take them to the dashboard
					<Dashboard viewer={viewer} />
				) : (
					// Lastly, redirect them
					<Redirect to="/login/classrooms" />
				)
			}
		/>
		<Route render={() => <Redirect to="/login/classrooms" />} />
	</Switch>
)

MappsLab.defaultProps = {
	viewer: null,
}

export default withCurrentViewerQuery(MappsLab)
