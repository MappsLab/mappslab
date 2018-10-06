// @flow
import React from 'react'
import { ViewerDashboardQuery } from 'Queries'
import { Main } from 'Components/Layout'
import { Header1 } from 'Components/Text'
import Tabs from 'Components/Tabs'
import { EntityBrowser } from 'Components/EntityBrowser'
import TeacherClassrooms from './TeacherClassrooms'

/**
 * Dashboard
 */

const Dashboard = () => (
	<ViewerDashboardQuery>
		{({ data }) => {
			const { viewer } = data.currentViewer
			return (
				<Main>
					<EntityBrowser />
					<Header1 align="left">Hi, Teach {viewer.name}</Header1>
					<Tabs initialTab="Classrooms">
						<Tabs.Menu />
						<Tabs.Tab name="Classrooms">
							<h1>Classrooms</h1>
							<TeacherClassrooms viewer={viewer} classrooms={viewer.classrooms} />
						</Tabs.Tab>
						<Tabs.Tab name="Maps">
							<h1>Maps</h1>
						</Tabs.Tab>
						<Tabs.Tab name="Lessons">
							<h1>Lessons</h1>
						</Tabs.Tab>
					</Tabs>
				</Main>
			)
		}}
	</ViewerDashboardQuery>
)

export default Dashboard
