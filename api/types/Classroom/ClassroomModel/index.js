// @flow
import { getClassroom, getClassrooms, getTeachers, getStudents, getClassroomsByUser } from './readClassroom'
import { updateClassroom } from './updateClassroom'
import { createClassroom, createClassroomConnection } from './createClassroom'
import { deleteClassroom } from './deleteClassroom'

module.exports = {
	getClassroom,
	getClassrooms,
	getClassroomsByUser,
	getTeachers,
	getStudents,
	updateClassroom,
	createClassroom,
	createClassroomConnection,
	deleteClassroom,
}
