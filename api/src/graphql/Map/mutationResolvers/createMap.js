// @flow
import type { MapType, NewMapData } from 'Types/MapTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { UserError } from 'Errors'

export const createMap = async (_: Object, { input }: { input: NewMapData }, ctx: GraphQLContext): Promise<MapType> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new maps. Please log in and try again.')
	const { viewer } = ctx

	if (!viewer.roles.includes('admin') && !viewer.roles.includes('teacher'))
		throw new Error('Only teachers and admins can create new maps')
	const { addToClassrooms } = input
	await Promise.all(
		addToClassrooms.map(async (classroomUid) => {
			/* Make sure the classroom exists */
			const classroom = await ctx.models.Classroom.getClassroom({ uid: classroomUid }, viewer)
			if (!classroom) throw new UserError(`A classroom with the uid "${classroomUid}" does not exist`)
			/* Make sure the viewer teaches in the classroom or is admin */
			if (!viewer.roles.includes('admin')) {
				const viewerTeachesInClassroom = await ctx.models.User.userTeachesInClassroom(viewer.uid, classroomUid)
				if (viewerTeachesInClassroom === false) {
					throw new UserError('You must be an admin to add a map to a classroom that you do not teach in')
				}
			}
		}),
	)

	const newMap = await ctx.models.Map.createMap(input)
	return newMap
}
