// @flow
import { getUser, getUsers, getViewer } from './readUser'
import { updateUser } from './updateUser'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { checkPassword, createResetToken, resetPassword } from './userAuth'
import {
	userTeachesInClassroom,
	userLearnsInClassroom,
	getPinOwner,
	getClassroomStudents,
	getClassroomTeachers,
} from './readUserRelationships'
// import { updatePassword } from './updatePassword'

export default {
	/* Create */
	createUser,

	/* Read */
	getUser,
	getViewer,
	getUsers,
	checkPassword,
	userTeachesInClassroom,
	userLearnsInClassroom,

	/* Update */
	updateUser,
	resetPassword,
	deleteUser,
	createResetToken,
	getPinOwner,
	getClassroomStudents,
	getClassroomTeachers,
}
