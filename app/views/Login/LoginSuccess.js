// @flow
import React from 'react'
import { Action } from 'react-automata'
import { Link } from 'react-router-dom'
import { Header2, Header4 } from 'Components/Text'
import { ViewerDashboardQuery } from 'Queries/Viewer'
import type { ViewerType } from 'Types/User'
import { ClassroomSelector } from 'Components/Classroom'
import { SHOW_NEWPW_SUCCESS, SELECTED_CLASSROOM } from './statechart'
import { MapChip } from 'Components/Map'

/**
 * LoginSuccess
 */

type BaseProps = {
	classroomUid?: string,
	transition: (string, ?{}) => void,
}

type Props = BaseProps & {
	viewer: ViewerType,
}

const LoginSuccess = ({ viewer, classroomUid, transition }: Props) => {
	if (!viewer.classrooms || !viewer.classrooms.length) return <Header4>Ask your teacher to add you to their classroom</Header4>
	const onClassroomSelect = (selectedItem) => {
		const selectedClassroomUid = selectedItem ? selectedItem.value : null
		transition(SELECTED_CLASSROOM, { classroomUid: selectedClassroomUid })
	}

	// const selectedClassroom = viewer.classrooms.length === 1 ? viewer.classrooms[0].uid : viewer.classrooms.find((c) => c.uid === classroomUid)
	// console.log(selectedClassroom)
	if (!viewer.classrooms || viewer.classrooms.length < 1) return null
	const selectedClassroom = viewer.classrooms.find((c) => c.uid === classroomUid) || viewer.classrooms[0]
	return (
		<React.Fragment>
			<Header2>Hi, {viewer.name}!</Header2>
			<Action is={SHOW_NEWPW_SUCCESS}>
				<Header4>Your new password is set.</Header4>
			</Action>
			<ClassroomSelector
				onSelect={onClassroomSelect}
				classrooms={viewer.classrooms ? viewer.classrooms : []}
				selectedItem={selectedClassroom && selectedClassroom.uid}
			/>
			{selectedClassroom && selectedClassroom.maps ? (
				<React.Fragment>
					<Header4>Go to a map:</Header4>
					{selectedClassroom.maps.map((m) => (
						<MapChip key={m.uid} map={m} to={`/maps/${m.uid}`} />
					))}
				</React.Fragment>
			) : null}
		</React.Fragment>
	)
}

const Wrapper = (props: BaseProps) => (
	<ViewerDashboardQuery>{({ data }) => <LoginSuccess {...props} viewer={data.currentViewer.viewer} />}</ViewerDashboardQuery>
)

Wrapper.defaultProps = {
	classroomUid: null,
}

export default Wrapper
