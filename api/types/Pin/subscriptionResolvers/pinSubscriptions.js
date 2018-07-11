// @flow
import { withFilter } from 'graphql-subscriptions'
import pubsub, { MAP_RECEIVED_PIN, PIN_MODIFIED } from '../../subscriptions'

const debug = require('debug')('api:subscriptions')

export const pinAddedToMap = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(MAP_RECEIVED_PIN),
		(payload, args) => {
			debug(`${MAP_RECEIVED_PIN} payload:`)
			debug(payload.pinAddedToMap.maps)
			const pinIsInSubscribedMap = payload.pinAddedToMap.maps.find((m) => m.uid === args.input.mapUid)
			return Boolean(pinIsInSubscribedMap)
		},
	),
}

export const pinModified = {
	subscribe: withFilter(
		() => pubsub.asyncinterator(PIN_MODIFIED),
		(payload, args) => {
			// debug(`${PIN_MODIFIED} payload:`)
			// debug(payload)
			// debug(args)
			return true
		},
	),
}
