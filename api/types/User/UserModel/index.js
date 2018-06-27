// @flow
import { getUser, getUsers, getViewer } from './readUser'
import { updateUser } from './updateUser'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { checkPassword } from './userAuth'
import { getPinOwner, getClassroomStudents, getClassroomTeachers } from './readRelationships'

module.exports = {
	getUser,
	getViewer,
	getUsers,
	updateUser,
	createUser,
	deleteUser,
	checkPassword,
	getPinOwner,
	getClassroomStudents,
	getClassroomTeachers,
}
