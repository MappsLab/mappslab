// @flow
import { pin } from './getPins'
import { owner } from './getPinRelationships'

export default {
	Query: {
		pin,
		// pin // pin by ID
	},
	Pin: {
		// maps // get any maps it appears in
		owner, // get owner
	},
}
