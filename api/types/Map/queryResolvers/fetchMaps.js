// @flow

import type { MapType } from '../MapTypes'
import type { PageType, GetNodeInput, PaginationInput, GraphQLContext } from '../../shared/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const map = (_: Object, { input }: GetNodeInput, ctx: GraphQLContext): Promise<MapType | null | Error> =>
	ctx.models.Map.getMap(input)

export const maps = async (_: Object, { input }: PaginationInput, ctx: GraphQLContext): Promise<PageType | null | Error> => {
	const fetchedMaps = await ctx.models.Map.getMaps(input).catch((err) => {
		throw err
	})
	return assemblePage(fetchedMaps, input)
}
