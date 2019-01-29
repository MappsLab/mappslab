// @flow
import { withFilter } from 'graphql-subscriptions'
import type { PinType } from 'Types/PinTypes'
import { path } from 'ramda'
import pubsub from '../../subscriptions'

// Topics
export const MAP_RECEIVED_PIN = 'pinAddedToMap'
export const PIN_UPDATED = 'pinUpdated'
export const PIN_DELETED = 'pinDeleted'

const debug = require('debug')('api')

type PinSubscriptionPayload = {
	pinAddedToMap: {
		pin: PinType,
	},
}

const pinIsInSubscribedMap = (payload: PinSubscriptionPayload, mapUid: string): boolean => {
	const maps = path(['pinAddedToMap', 'pin', 'maps'], payload)
	if (!maps) return false
	return maps && Boolean(maps.find((m) => m.uid === mapUid))
}

export const pinAddedToMap = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(MAP_RECEIVED_PIN),
		(payload, args) => {
			if (!payload.pinAddedToMap) return false
			debug(`${MAP_RECEIVED_PIN} payload:`)
			debug(payload.pinAddedToMap.maps)
			return pinIsInSubscribedMap(payload, args.input.mapUid)
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
			return pinIsInSubscribedMap(payload, args.input.mapUid)
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
			return pinIsInSubscribedMap(payload, args.input.mapUid)
		},
	),
}
