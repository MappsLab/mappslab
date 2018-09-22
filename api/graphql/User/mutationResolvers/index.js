// @flow
import { loginViewer, requestPasswordReset, resetPassword, setTemporaryPassword } from './userAuth'
import { createTeacher, createStudent } from './createUser'

export default {
	Mutation: {
		loginViewer,
		requestPasswordReset,
		resetPassword,
		setTemporaryPassword,
		createTeacher,
		createStudent,
		// addStudent
		// addTeacher
		// removeUser
	},
}
