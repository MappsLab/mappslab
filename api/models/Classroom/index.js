// @flow
import { getClassroom, getClassrooms } from './readClassroom'
import { updateClassroom } from './updateClassroom'
import { createClassroom, assignTeacher, assignStudent } from './createClassroom'
import { deleteClassroom } from './deleteClassroom'
import { getMapClassroom, getUserClassrooms } from './readClassroomRelationships'

export default {
	getClassroom,
	getClassrooms,
	getUserClassrooms,
	updateClassroom,
	createClassroom,
	assignTeacher,
	assignStudent,
	deleteClassroom,
	// Relationships
	getMapClassroom,
}
