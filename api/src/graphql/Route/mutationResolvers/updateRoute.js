// @flow
import type { RouteType, UpdateRouteData } from 'Types/RouteTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import pubsub from '../../subscriptions'
import { ROUTE_UPDATED } from '../subscriptionResolvers/routeSubscriptions'

export const updateRoute = async (
	_: any,
	{ input }: { input: UpdateRouteData },
	ctx: GraphQLContext,
): Promise<RouteType | null> => {
	if (!ctx.viewer)
		throw Error(
			'You must be logged in to create new routes. Please log in and try again.',
		)
	const existingRoute = await ctx.models.Route.getRoute(input.uid)
	if (!existingRoute) throw new Error('This route does not exist')
	if (existingRoute.owner.uid !== ctx.viewer.uid)
		throw new Error('You can only update your own routes')
	const updatedRoute = await ctx.models.Route.updateRoute(input, ctx.viewer.uid)
	// Query the DB for the new route so we can include relational data in the subscription filter
	const route = await ctx.models.Route.getRoute(updatedRoute.uid)
	if (route.maps) pubsub.publish(ROUTE_UPDATED, { [ROUTE_UPDATED]: { route } })

	return route
}
