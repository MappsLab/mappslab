// @flow
import { getUser, getUsers, getViewer } from './readUser'
import { updateUser } from './updateUser'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { checkPassword, createResetToken } from './userAuth'
import { getPinOwner, getClassroomStudents, getClassroomTeachers } from './readUserRelationships'
import { updatePassword } from './updatePassword'

export default {
	getUser,
	getViewer,
	getUsers,
	updateUser,
	updatePassword,
	createUser,
	deleteUser,
	checkPassword,
	createResetToken,
	getPinOwner,
	getClassroomStudents,
	getClassroomTeachers,
}
