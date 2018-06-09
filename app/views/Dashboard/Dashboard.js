// @flow
import React from 'react'
import type { ViewerType } from 'App/types'
import { withViewerDashboardQuery } from 'App/queries'
import { Main, HR } from 'App/components/Layout'
import { Header1, Header3 } from 'App/components/Text'
import ClassroomCard from './ClassroomCard'
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
		<MapCard title="Your Map" />
		<HR />
		<Header3>Your Classrooms</Header3>
		<HR />
		{viewer.classrooms && viewer.classrooms.map((c) => <ClassroomCard key={c.uid} classroom={c} />)}
	</Main>
)

export default withViewerDashboardQuery(Dashboard)
