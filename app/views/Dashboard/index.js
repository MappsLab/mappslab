// @flow
import * as React from 'react'
import { CurrentViewerQuery } from 'Queries/viewer'
import StudentDashboard from './StudentDashboard'
import TeacherDashboard from './TeacherDashboard'

export default () => (
	<CurrentViewerQuery>
		{({ data }) => (data.currentViewer.viewer.roles.includes('teacher') ? <TeacherDashboard /> : <StudentDashboard />)}
	</CurrentViewerQuery>
)
