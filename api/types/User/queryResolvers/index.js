// @flow

import { user, pins } from './getUsers'

export default {
	Query: {
		user,
	},
	User: {
		pins,
		// relation
	},
}
