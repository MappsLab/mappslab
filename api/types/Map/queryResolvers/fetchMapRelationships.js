// @flow

import type { MapType } from '../MapTypes'
import type { GraphQLContext, GetNodeArgs } from '../../shared/sharedTypes'

type GetMapInput = {
	input: GetNodeArgs,
}

export const classroom = (fetchedMap: MapType, _: GetMapInput, ctx: GraphQLContext): Promise<MapType | null | Error> =>
	ctx.models.Classroom.getClassroomMap(fetchedMap.uid)
