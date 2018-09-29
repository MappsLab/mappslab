// @flow
import { withFilter } from 'graphql-subscriptions'
import pubsub from '../../subscriptions'

// Topics
export const MAP_RECEIVED_PIN = 'pinAddedToMap'
export const PIN_UPDATED = 'pinUpdated'
export const PIN_DELETED = 'pinDeleted'

const debug = require('debug')('api')

export const pinAddedToMap = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(MAP_RECEIVED_PIN),
		(payload, args) => {
			if (!payload.pinAddedToMap) return false
			debug(`${MAP_RECEIVED_PIN} payload:`)
			debug(payload.pinAddedToMap.maps)
			const pinIsInSubscribedMap = payload.pinAddedToMap.maps.find((m) => m.uid === args.input.mapUid)
			return Boolean(pinIsInSubscribedMap)
		},
	),
}

export const pinUpdated = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(PIN_UPDATED),
		(payload, args) => {
			if (!payload.pinUpdated) return false
			debug(`${PIN_UPDATED} payload:`)
			debug(payload)
			const pinIsInSubscribedMap = payload.pinUpdated.maps.find((m) => m.uid === args.input.mapUid)
			return Boolean(pinIsInSubscribedMap)
		},
	),
}

export const pinDeleted = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(PIN_DELETED),
		(payload, args) => {
			if (!payload.pinDeleted) return false
			debug(`${PIN_DELETED} payload:`)
			debug(payload)
			const pinIsInSubscribedMap = payload.pinDeleted.maps.find((m) => m.uid === args.input.mapUid)
			return Boolean(pinIsInSubscribedMap)
		},
	),
}
