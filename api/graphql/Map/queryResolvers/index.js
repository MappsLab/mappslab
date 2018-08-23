// @flow
import { map } from './fetchMaps'
import { classroom, pins } from './fetchMapRelationships'

export default {
	Query: {
		map, // map by ID
	},
	Map: {
		classroom,
		pins,
	},
}
