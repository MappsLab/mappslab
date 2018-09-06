// @flow

import { user, currentViewer } from './getUsers'
import { pins, classrooms } from './getUserConnections'

export default {
	Query: {
		user,
		currentViewer,
	},
	User: {
		pins,
		classrooms,
	},
}
