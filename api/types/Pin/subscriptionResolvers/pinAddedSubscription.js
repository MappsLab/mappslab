// @flow
import { withFilter } from 'graphql-subscriptions'
import { pubsub, PIN_ADDED_TO_MAP } from '../../subscriptions'

const debug = require('debug')('api')

export const pinAddedToMap = {
	subscribe: () => pubsub.asyncIterator(PIN_ADDED_TO_MAP),
	// subscribe: withFilter(
	// 	() => pubsub.asyncIterator(PIN_ADDED_TO_MAP),
	// 	(payload, args) => {
	// 		debug(`${PIN_ADDED_TO_MAP} payload:`)
	// 		debug(payload)
	// 		debug(args)
	// 		return true
	// 	},
	// ),
}
