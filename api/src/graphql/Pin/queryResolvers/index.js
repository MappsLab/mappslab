// @flow
import { pin } from './getPins'
import { owner, maps, routes } from './getPinRelationships'

export default {
	Query: {
		pin,
		// pin // pin by ID
	},
	Pin: {
		maps, // get any maps it appears in
		routes, // get any routes containing this pin
		owner, // get owner
	},
}
