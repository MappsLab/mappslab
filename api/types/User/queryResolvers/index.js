// @flow

import { user, pins, currentViewer } from './getUsers'

export default {
	Query: {
		user,
		viewer: currentViewer,
		showHeader: (_, { headerName }, ctx) => ctx.request.get(headerName),
	},
	User: {
		pins,
		// relation
	},
}
