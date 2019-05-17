// @flow
import { withFilter } from 'graphql-subscriptions'
import type { MapType } from 'Types/MapTypes'
import pubsub from '../../subscriptions'

// Topics
export const MAP_UPDATED = 'mapUpdated'

const debug = require('debug')('api')

type MapSubsciptionPayload = {
	mapUpdated: {
		map: MapType,
	},
}

export const mapUpdated = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(MAP_UPDATED),
		(payload: MapSubsciptionPayload, args) => {
			if (!payload.mapUpdated) return false
			debug(`${MAP_UPDATED} payload:`)
			debug(payload)
			return payload.mapUpdated.map.uid === args.input.mapUid
		},
	),
}
