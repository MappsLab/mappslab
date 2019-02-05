// @flow

import { user, users, teachers, students, currentViewer } from './getUsers'
import { pins, classrooms } from './getUserConnections'

export default {
	Query: {
		user,
		users,
		currentViewer,
		teachers,
		students,
	},
	User: {
		pins,
		classrooms,
	},
}
