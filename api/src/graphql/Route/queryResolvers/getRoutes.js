// @flow

import type { RouteType } from 'Types/RouteTypes'
import type {
	PageType,
	GetNodeInput,
	PaginationInput,
	GraphQLContext,
} from 'Types/sharedTypes'
import { assemblePage } from 'Utils/graphql'

export const route = async (
	_: Object,
	{ input }: GetNodeInput,
	ctx: GraphQLContext,
): Promise<RouteType | null> => ctx.models.Route.getRoute(input.uid)

export const routes = async (
	_: Object,
	{ input }: PaginationInput,
	ctx: GraphQLContext,
): Promise<PageType<RouteType>> => {
	const fetchedRoutes = await ctx.models.Route.getRoutes(input)
	return assemblePage(fetchedRoutes, input)
}
