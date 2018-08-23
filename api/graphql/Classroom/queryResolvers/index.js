// @flow
import { classroom, classrooms } from './classroomQueries'
import { studentsConnection, teachersConnection, mapsConnection } from './classroomConnectionQueries'

export default {
	Query: {
		classroom, // classroom by ID
		classrooms, // classroom by ID
	},
	Classroom: {
		students: studentsConnection,
		teachers: teachersConnection,
		maps: mapsConnection,
	},
}
