// @flow
import type { RouteType, NewRouteData } from 'Types/RouteTypes'
import { createNodeWithEdges } from 'Database'
import { clean, validateNew } from './routeDBSchema'

export const createRoute = async ({ addPin, addPins, ...rest }: NewRouteData, ownerUid: string): Promise<RouteType> => {
	const newPin = addPin || undefined
	const newPins = addPins || []
	const pins = [newPin, ...newPins].filter(Boolean)

	const cleaned = await clean({ ...rest })
	const validated = await validateNew(cleaned)

	const edges = [
		[{ fromUid: ownerUid, pred: 'owns_route' }, {}],
		...pins.map((pinUid) => [
			{
				toUid: pinUid,
				pred: 'includes_pin',
			},
			{},
		]),
	]

	const route: RouteType = await createNodeWithEdges(validated, edges)
	return route
}
