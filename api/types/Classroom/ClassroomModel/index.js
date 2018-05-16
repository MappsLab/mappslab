// @flow
import { getClassroom, getClassrooms, getTeachers, getStudents } from './readClassroom'
import { updateClassroom } from './updateClassroom'
import { createClassroom, createClassroomConnection } from './createClassroom'
import { deleteClassroom } from './deleteClassroom'

module.exports = {
	getClassroom,
	getClassrooms,
	getTeachers,
	getStudents,
	updateClassroom,
	createClassroom,
	createClassroomConnection,
	deleteClassroom,
}
