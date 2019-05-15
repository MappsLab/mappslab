// @flow
import type { MapType, UpdateMapData } from 'Types/MapTypes'
import type { GraphQLContext } from 'Types/sharedTypes'

interface UpdateMapArgs {
	input: UpdateMapData;
}

export const updateMap = async (_: any, { input }: UpdateMapArgs, ctx: GraphQLContext): Promise<MapType | null> => {
	const { uid } = input
	const { viewer } = ctx
	if (!viewer) throw new Error('You must be logged in to update maps. Please log in and try again.')
	const existingMap = await ctx.models.Map.getMap({ uid })
	console.log('1')
	console.log(existingMap)
	console.log(ctx.viewer)
	if (!existingMap) throw new Error(`A map with the id ${input.uid} does not exist`)
	const { owners } = existingMap.classroom[0]
	const viewerIsOwner = Boolean(owners.find((o) => o.uid === viewer.uid))
	if (!viewerIsOwner) throw new Error('You can only update maps that you own.')
	console.log('2')
	await ctx.models.Map.updateMap(input)
	console.log('3')
	const map = await ctx.models.Map.getMap({ uid })

	return map
}
