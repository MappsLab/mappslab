// @flow

import { user, users, currentViewer } from './getUsers'
import { pins, classrooms } from './getUserConnections'

export default {
	Query: {
		user,
		users,
		currentViewer,
	},
	User: {
		pins,
		classrooms,
	},
}
