// @flow
import { classroom, classrooms } from './classroomQueries'
import {
	classroomStudents,
	classroomTeachers,
	classroomMaps,
} from './classroomConnectionQueries'

export default {
	Query: {
		classroom, // classroom by ID
		classrooms, // classroom by ID
	},
	Classroom: {
		students: classroomStudents,
		teachers: classroomTeachers,
		maps: classroomMaps,
	},
}
