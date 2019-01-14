// @flow
import type { RouteType, NewRouteData } from 'Types/RouteTypes'
import { createNodeWithEdges } from 'Database'
import { clean, validateNew } from './routeDBSchema'

export const createRoute = async (args: NewRouteData, ownerUid: string): Promise<RouteType> => {
	const { pins } = args
	const cleaned = await clean(args)
	const validated = await validateNew(cleaned)

	const edges = [
		[{ fromUid: ownerUid, pred: 'owns_route' }, {}],
		...pins.map((pinUid, order) => [
			{
				toUid: pinUid,
				pred: 'includes_pin',
				facets: {
					order,
				},
			},
			{},
		]),
	]

	const route: RouteType = await createNodeWithEdges(validated, edges)
	return route
}
