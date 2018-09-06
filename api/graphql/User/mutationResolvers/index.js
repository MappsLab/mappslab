// @flow
import loginViewer from './loginViewer'
import updatePassword from './updatePassword'
import { createTeacher, createStudent } from './createUser'

export default {
	Mutation: {
		loginViewer,
		updatePassword,
		createTeacher,
		createStudent,
		// addStudent
		// addTeacher
		// removeUser
	},
}
