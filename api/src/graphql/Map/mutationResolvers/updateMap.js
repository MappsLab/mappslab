// @flow
import type { MapType, UpdateMapData } from 'Types/MapTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { MAP_UPDATED } from '../subscriptionResolvers/mapSubscriptions'
import pubsub from '../../subscriptions'

interface UpdateMapArgs {
	input: UpdateMapData;
}

export const updateMap = async (_: any, { input }: UpdateMapArgs, ctx: GraphQLContext): Promise<MapType | null> => {
	const { uid } = input
	const { viewer } = ctx
	if (!viewer) throw new Error('You must be logged in to update maps. Please log in and try again.')
	// $FlowFixMe
	const existingMap = await ctx.models.Map.getMap({ uid })
	if (!existingMap) throw new Error(`A map with the id ${input.uid} does not exist`)
	const { owners } = existingMap.classroom[0]
	const viewerIsOwner = Boolean(owners.find((o) => o.uid === viewer.uid))
	if (!viewerIsOwner) throw new Error('You can only update maps that you own.')
	const dispatchUpdate = async (preloadedMap?: MapType | null) => {
		const map = preloadedMap || (await ctx.models.Map.getMap({ uid }))
		pubsub.publish(MAP_UPDATED, { [MAP_UPDATED]: { map } })
	}
	await ctx.models.Map.updateMap(input, dispatchUpdate)
	const map = await ctx.models.Map.getMap({ uid })
	dispatchUpdate(map)
	return map
}
