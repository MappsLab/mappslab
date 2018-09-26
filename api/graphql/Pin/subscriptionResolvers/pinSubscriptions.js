// @flow
import { withFilter } from 'graphql-subscriptions'
import pubsub from '../../subscriptions'

// Topics
export const MAP_RECEIVED_PIN = 'pinAddedToMap'
export const PIN_MODIFIED = 'pinModified'
export const PIN_DELETED = 'pinDeleted'

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
		() => pubsub.asyncIterator(PIN_MODIFIED),
		(payload, args) => {
			debug(`${PIN_MODIFIED} payload:`)
			debug(payload)
			// debug(args)
			return true
		},
	),
}

export const pinDeleted = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(PIN_DELETED),
		(payload, args) => {
			debug(`${PIN_DELETED} payload:`)
			debug(payload)
			return true
		},
	),
}
