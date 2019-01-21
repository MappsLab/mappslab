// @flow

import { pins, owner } from './fetchRouteRelationships'
import { route, routes } from './getRoutes'

export default {
	Query: {
		route,
		routes,
	},
	Route: {
		pins,
		owner,
		// maps
	},
}
