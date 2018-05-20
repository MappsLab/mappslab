// @flow
import { classroom, classrooms } from './classroomQueries'
import { studentsConnection, teachersConnection } from './classroomConnectionQueries'

export default {
	Query: {
		classroom, // classroom by ID
		classrooms, // classroom by ID
	},
	Classroom: {
		students: studentsConnection,
		teachers: teachersConnection,
	},
}
