// @flow

import { user, pins, currentViewer } from './getUsers'

export default {
	Query: {
		user,
		viewer: currentViewer,
	},
	User: {
		pins,
		// relation
	},
}
