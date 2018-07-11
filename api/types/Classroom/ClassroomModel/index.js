// @flow
import { getClassroom, getClassrooms } from './readClassroom'
import { updateClassroom } from './updateClassroom'
import { createClassroom, createClassroomConnection } from './createClassroom'
import { deleteClassroom } from './deleteClassroom'
import { getMapClassroom, getUserClassrooms } from './readClassroomRelationships'

module.exports = {
	getClassroom,
	getClassrooms,
	getUserClassrooms,
	updateClassroom,
	createClassroom,
	createClassroomConnection,
	deleteClassroom,
	// Relationships
	getMapClassroom,
}
