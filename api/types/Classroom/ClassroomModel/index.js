// @flow
import { getClassroom, getClassrooms } from './readClassroom'
import { updateClassroom } from './updateClassroom'
import { createClassroom, createClassroomConnection } from './createClassroom'
import { deleteClassroom } from './deleteClassroom'
import { getMapClassroom, getUserClassrooms } from './readClassroomRelationships'

export default  {
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
