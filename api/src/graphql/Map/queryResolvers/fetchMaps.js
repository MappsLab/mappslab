// @flow

import type { MapType } from 'Types/MapTypes'
import type {
	PageType,
	GetNodeInput,
	PaginationInput,
	GraphQLContext,
} from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const map = (
	_: Object,
	{ input }: GetNodeInput,
	ctx: GraphQLContext,
): Promise<MapType | null> => ctx.models.Map.getMap(input)

export const maps = async (
	_: Object,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<MapType> | null> => {
	const fetchedMaps = await ctx.models.Map.getMaps(input)
	return assemblePage(fetchedMaps, input)
}
