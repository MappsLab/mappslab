// @flow
import React from 'react'
import type { ViewerType } from 'App/types'
import { withViewerDashboardQuery } from 'App/queries'
import { Main, HR } from 'App/components/Layout'
import { Header1, Header2, Header3 } from 'App/components/Text'
import MapCard from './MapCard'

/**
 * Dashboard
 */

type Props = {
	viewer: ViewerType,
}

const Dashboard = ({ viewer }: Props) => (
	<Main>
		<Header1 align="left">Hi, {viewer.name}</Header1>
		<MapCard title="Your Map" viewerMap userUid={viewer.uid} />
		<HR />
		<Header3>Your Classrooms</Header3>
		<HR />
		{viewer.classrooms &&
			viewer.classrooms.map((c) => (
				<div key={c.uid}>
					<Header2>{c.title}</Header2>
					<Header3>{c.teachers[0].name}</Header3>
					{c.maps.map((map) => <MapCard key={map.uid} {...map} />)}
				</div>
			))}
	</Main>
)

export default withViewerDashboardQuery(Dashboard)
