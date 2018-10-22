// @flow
import { map } from './fetchMaps'
import { classroom, pins, routes } from './fetchMapRelationships'

export default {
	Query: {
		map, // map by ID
	},
	Map: {
		classroom,
		pins,
		routes,
	},
}
