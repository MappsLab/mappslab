// @flow
import type { RouteType } from 'Types/RouteTypes'
import { mutateNode } from 'Database'
import { getRoute } from './readRoute'
import { clean, validateUpdate } from './routeDBSchema'

type UpdatePinArgs = {
	routeUid: string,
	pins: Array<string>, // pin UIDs
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
	position?: 'BEFORE' | 'AFTER',
}

export const addPin = async ({ routeUid, pinUid, connectToPin, position }: AddPinArgs, ownerUid: string): Promise<RouteType> => {
	const route = await getRoute(routeUid)
	if (!route) throw new Error(`No route with a uid of ${routeUid} was found`)
	const originalPins = route.pins ? route.pins.map((p) => p.uid) : []
	// Create an updated array of edges with the proper sort order
	const connectedPinIndex = originalPins.findIndex((p) => p === connectToPin)
	const sliceIndex = position === 'BEFORE' ? connectedPinIndex : connectedPinIndex + 1

	const pins = [...originalPins.slice(0, sliceIndex), pinUid, ...originalPins.slice(sliceIndex)]
	return updateRoute({ routeUid, pins }, ownerUid)
}
