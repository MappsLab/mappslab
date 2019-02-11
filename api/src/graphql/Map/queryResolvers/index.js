// @flow
import { map, maps } from './fetchMaps'
import { classroom, pins, routes } from './fetchMapRelationships'

export default {
	Query: {
		map, // map by ID
		maps,
	},
	Map: {
		classroom,
		pins,
		routes,
	},
}
