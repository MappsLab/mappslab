// @flow
import type { RouteType, NewRouteData } from 'Types/RouteTypes'
import type { GraphQLContext } from 'Types/sharedTypes'

// import pubsub from '../../subscriptions'
// import { MAP_RECEIVED_ROUTE } from '../subscriptionResolvers/pinSubscriptions'

export const createRoute = async (_: Object, { input }: { input: NewRouteData }, ctx: GraphQLContext): Promise<RouteType> => {
	if (!ctx.viewer) throw Error('You must be logged in to create a route. Please log in and try again.')
	const newRoute = await ctx.models.Route.createRoute(input, ctx.viewer.uid)
	const route = await ctx.models.Route.getRoute(newRoute.uid)
	if (!route) throw new Error(`Error fetching new route ${newRoute.uid}`)
	return route
}
