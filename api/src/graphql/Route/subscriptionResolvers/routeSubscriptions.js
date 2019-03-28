// @flow
import { withFilter } from 'graphql-subscriptions'
import type { RouteType } from 'Types/RouteTypes'
import { path } from 'ramda'
import pubsub from '../../subscriptions'

// Topics
export const ROUTE_UPDATED = 'ROUTE_UPDATED'

const debug = require('debug')('api')

type RouteSubscriptionPayload = {
	routeUpdated: {
		route: RouteType,
	},
}

const routeIsInSubscribedMap = (payload: RouteSubscriptionPayload, mapUid: string, key: string): boolean => {
	const maps = path([key, 'route', 'maps'])(payload)
	if (!maps) return false
	return maps && Boolean(maps.find((m) => m.uid === mapUid))
}

export const routeUpdated = {
	subscribe: withFilter(
		() => pubsub.asyncIterator(ROUTE_UPDATED),
		(payload, args) => {
			if (!payload.routeUpdated) return false
			debug(`${ROUTE_UPDATED} payload:`)
			debug(payload)
			return routeIsInSubscribedMap(payload, args.input.mapUid, ROUTE_UPDATED)
		},
	),
}
