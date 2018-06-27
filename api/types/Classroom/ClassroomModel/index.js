// @flow
import { getClassroom, getClassrooms, getClassroomsByUser } from './readClassroom'
import { updateClassroom } from './updateClassroom'
import { createClassroom, createClassroomConnection } from './createClassroom'
import { deleteClassroom } from './deleteClassroom'

module.exports = {
	getClassroom,
	getClassrooms,
	getClassroomsByUser,
	updateClassroom,
	createClassroom,
	createClassroomConnection,
	deleteClassroom,
}
