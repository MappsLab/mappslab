// @flow

import { studentsConnection, teachersConnection } from './classroomConnectionQueries'

export default {
	Query: {
		// classroom // classroom by ID
	},
	Classroom: {
		students: studentsConnection,
		teachers: teachersConnection,
	},
}
