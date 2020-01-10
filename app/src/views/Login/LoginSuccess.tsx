import React, { useEffect, useMemo } from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Action } from 'react-automata'
import { Header1, Header2, Header4 } from '../../components/Text'
import { ViewerType } from '../../types/User'
import { MapChip } from '../../components/Map'
import { Button } from '../../components/Buttons'
import { useCurrentViewer } from '../../providers/CurrentViewer'
import { SHOW_NEWPW_SUCCESS, LOGOUT } from './statechart'
import { Classroom, Map } from '../../types-ts'

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

	const [classrooms] = unwindEdges<Classroom>(viewer.classrooms)
	const maps = classrooms
		.map((classroom) =>
			classroom.maps ? unwindEdges<Map>(classroom.maps) : [[]],
		)
		.reduce((acc, [maps]) => (maps ? [...acc, ...maps] : acc), [])
		.filter(Boolean)

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
			{!isTeacher && !isAdmin && (!classrooms || !classrooms.length) ? (
				<Header4>
					You are currently not assigned to any classrooms. Ask your teacher to
					add you to their classroom.
				</Header4>
			) : maps && maps.length ? (
				<React.Fragment>
					<Header2>Go to a map:</Header2>
					{maps.map((m) => (
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
