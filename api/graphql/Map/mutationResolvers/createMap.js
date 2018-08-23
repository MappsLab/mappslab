// @flow
import type { MapType, NewMapInput } from 'Types/MapTypes'
import type { GraphQLContext } from 'Types/sharedTypes'

export const createMap = async (_: Object, { input }: NewMapInput, ctx: GraphQLContext): Promise<MapType> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new maps. Please log in and try again.')
	const { classroomUid, ...mapData } = input
	const existingClassroom = await ctx.models.Classroom.getClassroom({ uid: classroomUid })
	if (!existingClassroom) throw new Error(`Classroom with uid ${classroomUid} does not exist`)
	const newMap = await ctx.models.Map.createMap(mapData, classroomUid)
	return newMap
}
