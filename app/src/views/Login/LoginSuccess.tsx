import React, { useEffect } from 'react'
import { Action } from 'react-automata'
import { Header1, Header2, Header4 } from '../../components/Text'
import { ViewerType } from '../../types/User'
import { MapChip } from '../../components/Map'
import { Button } from '../../components/Buttons'
import { useCurrentViewer } from '../../providers/CurrentViewer'
import { SHOW_NEWPW_SUCCESS, LOGOUT } from './statechart'

/**
 * LoginSuccess
 */

interface Props {
	transition: (name: string, data?: any) => void
	viewer: ViewerType
}

export const LoginSuccess = ({ transition }: Props) => {
	const { viewer, logoutUser } = useCurrentViewer()

	useEffect(() => {
		if (!viewer) transition(LOGOUT)
	}, [viewer])

	if (!viewer) return null
	const isTeacher = viewer.roles.includes('teacher')
	const isAdmin = viewer.roles.includes('admin')

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
			{!isTeacher && !isAdmin && (!viewer.classrooms || !viewer.classrooms.length) ? (
				<Header4>You are currently not assigned to any classrooms. Ask your teacher to add you to their classroom.</Header4>
			) : viewerMaps && viewerMaps.length ? (
				<React.Fragment>
					<Header2>Go to a map:</Header2>
					{viewerMaps.map((m) => (
						<MapChip key={m.uid} map={m} to={`/maps/${m.uid}`} />
					))}
				</React.Fragment>
			) : null}
			{isTeacher && (
				<Button to="/dashboard" level="tertiary">
					Manage my classrooms
				</Button>
			)}
			<Button level="tertiary" onClick={logoutUser}>
				Not you? Log in as someone else →
			</Button>
		</React.Fragment>
	)
}
