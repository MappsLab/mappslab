// @flow
import { loginViewer, resetPassword } from './userAuth'
import { createTeacher, createStudent } from './createUser'

export default {
	Mutation: {
		loginViewer,
		resetPassword,
		createTeacher,
		createStudent,
		// addStudent
		// addTeacher
		// removeUser
	},
}
