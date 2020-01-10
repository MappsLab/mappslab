// @flow
import {
	loginViewer,
	requestPasswordReset,
	resetPassword,
	setTemporaryPassword,
} from './userAuth'
import { createTeacher, createStudent, createAdmin } from './createUser'
import { updateUser } from './updateUser'

export default {
	Mutation: {
		createTeacher,
		createStudent,
		createAdmin,
		updateUser,
		loginViewer,
		requestPasswordReset,
		resetPassword,
		setTemporaryPassword,
		// addStudent
		// addTeacher
		// removeUser
	},
}
