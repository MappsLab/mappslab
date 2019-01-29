// @flow
import type { RouteType } from 'Types/RouteTypes'
import { mutateNode } from 'Database'
import { getRoute } from './readRoute'
import { clean, validateUpdate } from './routeDBSchema'

type UpdatePinArgs = {
	routeUid: string,
	pins: Array<string>,
	description?: string,
	title?: string,
}

export const updateRoute = async (args: UpdatePinArgs, ownerUid: string) => {
	const { routeUid, pins, ...routeData } = args
	const route = await getRoute(routeUid)
	if (!route) throw new Error(`No route with a uid of ${routeUid} was found`)
	if (route.owner.uid !== ownerUid) throw new Error('You can only update routes that you own')

	const cleaned = await clean(routeData)
	const validatedRouteData = await validateUpdate(cleaned)

	const edges = pins.map((pinUid, order) => [
		{
			toUid: pinUid,
			pred: 'includes_pin',
			facets: {
				order,
			},
		},
		{},
	])

	const mutated = await mutateNode(routeUid, { data: validatedRouteData, edges })
	return mutated
}

type AddPinArgs = {
	routeUid: string,
	pinUid: string,
	connectToPin?: string,
}

export const addPin = async ({ routeUid, pinUid, connectToPin }: AddPinArgs, ownerUid: string): Promise<RouteType> => {
	const route = await getRoute(routeUid)
	if (!route) throw new Error(`No route with a uid of ${routeUid} was found`)
	const originalPins = route.pins || []
	// Create an updated array of edges with the proper sort order
	const pins = originalPins
		.map((pin) => pin.uid) // Get the original UIDs
		.reduce(
			(acc, pin) =>
				pin === connectToPin
					? // If the current pin in the reducer is the `connectToPin`, insert the new `pinUid`
					  [...acc, pin, pinUid]
					: // otherwise, return only the current pin
					  [...acc, pin],
			[],
		)
	return updateRoute({ routeUid, pins }, ownerUid)
}
