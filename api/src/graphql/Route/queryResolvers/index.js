// @flow

import { pins, owner, image } from './fetchRouteRelationships'
import { route, routes } from './getRoutes'

export default {
	Query: {
		route,
		routes,
	},
	Route: {
		pins,
		owner,
		image,
		// maps
	},
}
