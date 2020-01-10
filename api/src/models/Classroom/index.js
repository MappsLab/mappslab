// @flow
import { getClassroom, getClassrooms } from './readClassroom'
import { updateClassroom } from './updateClassroom'
import {
	createClassroom,
	assignTeacher,
	assignStudent,
} from './createClassroom'
import { deleteClassroom } from './deleteClassroom'
import {
	getMapClassroom,
	getStudentClassrooms,
	getTeacherClassrooms,
} from './readClassroomRelationships'

export default {
	getClassroom,
	getClassrooms,
	getStudentClassrooms,
	getTeacherClassrooms,
	updateClassroom,
	createClassroom,
	assignTeacher,
	assignStudent,
	deleteClassroom,
	// Relationships
	getMapClassroom,
}
