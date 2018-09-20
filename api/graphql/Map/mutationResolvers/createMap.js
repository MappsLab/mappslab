// @flow
import type { MapType, NewMapData } from 'Types/MapTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { UserError } from 'Errors'

export const createMap = async (_: Object, { input }: { input: NewMapData }, ctx: GraphQLContext): Promise<MapType> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new maps. Please log in and try again.')
	const { classroomUid } = input
	const { viewer } = ctx
	// console.log(args)
	const existingClassroom = await ctx.models.Classroom.getClassroom({ uid: classroomUid })
	if (!existingClassroom) throw new UserError(`Classroom with uid ${classroomUid} does not exist`)
	if (!viewer.roles.includes('admin') && !ctx.models.User.userTeachesInClassroom(viewer.uid, classroomUid)) {
		throw new UserError('You must be an admin to add a map to a classroom that you do not teach in')
	}
	const newMap = await ctx.models.Map.createMap(input)
	return newMap
}
