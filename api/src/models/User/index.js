// @flow
import { getUser, getUsers, getViewer } from './readUser'
import { updateUser } from './updateUser'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import {
	checkPassword,
	createResetToken,
	resetPassword,
	setTemporaryPassword,
} from './userAuth'
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
	setTemporaryPassword,
	deleteUser,
	createResetToken,
	getPinOwner,
	getClassroomStudents,
	getClassroomTeachers,
}
