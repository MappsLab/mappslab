// @flow
import { pin } from './getPins'
import { owner, maps, route, image } from './getPinRelationships'

export default {
	Query: {
		pin,
		// pin // pin by ID
	},
	Pin: {
		maps, // get any maps it appears in
		route,
		owner, // get owner
		image,
	},
}
