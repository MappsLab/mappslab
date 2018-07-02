// @flow
import { map } from './fetchMaps'
import { classroom } from './fetchMapRelationships'

export default {
	Query: {
		map, // map by ID
	},
	Map: {
		classroom,
		// relation
	},
}
