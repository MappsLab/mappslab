// @flow
import React from 'react'
import type { ViewerType } from 'Types'
import { ViewerDashboardQuery } from 'Queries'
import { Main, HR } from 'Components/Layout'
import { Header1, Header2, Header3 } from 'Components/Text'
import Tabs from 'Components/Tabs'
import MapCard from './MapCard'
/**
 * Dashboard
 */

const Dashboard = () => (
	<ViewerDashboardQuery>
		{({ data }) => {
			const { viewer } = data.currentViewer
			return (
				<Main>
					<Header1 align="left">Hi, Teach {viewer.name}</Header1>
					<MapCard title="Your Map" viewerMap userUid={viewer.uid} />
					<Tabs initialTab="Classrooms">
						<Tabs.Menu />
						<Tabs.Tab name="Classrooms">
							<h1>Classrooms</h1>
						</Tabs.Tab>
						<Tabs.Tab name="Maps">
							<h1>Maps</h1>
						</Tabs.Tab>
					</Tabs>
					<HR />
					<Header3>Your Classrooms</Header3>
					<HR />
					{viewer.classrooms &&
						viewer.classrooms.map((c) => (
							<div key={c.uid}>
								<Header2>{c.title}</Header2>
								<Header3>{c.teachers[0].name}</Header3>
								{c.maps.map((map) => (
									<MapCard key={map.uid} {...map} />
								))}
							</div>
						))}
				</Main>
			)
		}}
	</ViewerDashboardQuery>
)

export default Dashboard
