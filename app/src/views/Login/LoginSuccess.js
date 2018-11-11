// @flow
import React from 'react'
import { Action } from 'react-automata'
import { Header1, Header2, Header4 } from 'Components/Text'
import { ViewerDashboardQuery } from 'Queries/Viewer'
import type { ViewerType } from 'Types/User'
import { UserChip } from 'Components/User'
import { MapChip } from 'Components/Map'
import { Button } from 'Components/Buttons'
import { InspectorConsumer } from 'Components/Inspector'
import { VIEWER_COOKIE_TOKEN, removeCookie } from 'Utils/storage'
import { SHOW_NEWPW_SUCCESS, LOGOUT } from './statechart'

/**
 * LoginSuccess
 */

type BaseProps = {
	transition: (string, ?{}) => void,
}

type Props = BaseProps & {
	viewer: ViewerType,
}

const LoginSuccess = ({ viewer, transition }: Props) => {
	if (!viewer.classrooms || !viewer.classrooms.length) return <Header4>Ask your teacher to add you to their classroom</Header4>
	const logout = () => {
		removeCookie(VIEWER_COOKIE_TOKEN)
		transition(LOGOUT, { userUid: null })
	}

	if (!viewer.classrooms || viewer.classrooms.length < 1) return null
	const isTeacher = viewer.roles.includes('teacher')
	const viewerMaps =
		viewer.classrooms && viewer.classrooms.map((c) => c.maps).reduce((acc, maps) => (maps ? [...acc, ...maps] : acc), [])
	return (
		<React.Fragment>
			<Header1>
				<span role="img" aria-label="waving hand">
					👋
				</span>{' '}
				Hi, {viewer.name}!
			</Header1>
			<Action is={SHOW_NEWPW_SUCCESS}>
				<Header4>Your new password is set.</Header4>
			</Action>
			<UserChip user={viewer} />
			<Button level="tertiary" onClick={logout}>
				Not you? Log in as someone else →
			</Button>
			{viewerMaps ? (
				<React.Fragment>
					<Header2>Go to a map:</Header2>
					{viewerMaps.map((m) => (
						<MapChip key={m.uid} map={m} to={`/maps/${m.uid}`} />
					))}
				</React.Fragment>
			) : null}
			{isTeacher && (
				<Button to={encodeURI(`/dashboard?inspect=user-${viewer.uid}-${viewer.name}`)} level="tertiary">
					Manage my classrooms
				</Button>
			)}
		</React.Fragment>
	)
}

const Wrapper = (props: BaseProps) => (
	<InspectorConsumer>
		{(inspectorProps) => (
			<ViewerDashboardQuery>
				{({ data }) => <LoginSuccess {...props} {...inspectorProps} viewer={data.currentViewer.viewer} />}
			</ViewerDashboardQuery>
		)}
	</InspectorConsumer>
)

Wrapper.defaultProps = {
	classroomUid: null,
}

export default Wrapper
