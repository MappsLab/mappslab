// @flow
import { map, maps } from './fetchMaps'
import {
	classroom,
	dataLayers,
	pins,
	routes,
	baseImage,
} from './fetchMapRelationships'

export default {
	Query: {
		map, // map by ID
		maps,
	},
	Map: {
		dataLayers,
		classroom,
		pins,
		routes,
		baseImage,
	},
}
