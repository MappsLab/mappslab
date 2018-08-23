// @flow

import { user, currentViewer } from './getUsers'
import { pins, classrooms } from './getUserConnections'

export default {
	Query: {
		user,
		currentViewer,
	},
	Viewer: {
		pins,
		classrooms,
	},
	User: {
		pins,
		classrooms,
	},
}
