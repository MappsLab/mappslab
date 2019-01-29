// @flow
import type { PinType, NewPinData } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import { createNodeWithEdges } from 'Database'
import Route from '../Route'
import { clean, defaultValues, validateNew } from './pinDBSchema'

// const debug = require('debug')('api')

type AddToRouteArgs = $PropertyType<NewPinData, 'addToRoute'>

const addPinToRoute = async (pin: PinType, addToRoute: AddToRouteArgs, ownerUid: string): Promise<RouteType> => {
	if (!addToRoute) throw new Error('You did not supply an `addToRoute` to the arguments')
	const { routeUid, connectToPin } = addToRoute
	/* If `connectToPin` was supplied, add it to the array of pins in the route. Only used when createing a route */
	const pins = [connectToPin, pin.uid].filter(Boolean)
	const newRoute = routeUid
		? await Route.addPin({ routeUid, pinUid: pin.uid, connectToPin }, ownerUid)
		: await Route.createRoute({ pins }, ownerUid)
	return newRoute
}

export const createPin = async (args: NewPinData, ownerUid: string): Promise<PinType> => {
	const { addToMaps, addToLessons, addToRoute, ...pinData } = args
	const cleaned = await clean({ ...defaultValues, ...pinData, createdAt: new Date() })
	const validatedPinData = await validateNew(cleaned)
	const edges = []

	// Add the owner relationship (required)
	edges.push([{ fromUid: ownerUid, pred: 'pinned' }, {}])

	// Add the map relationship (optional)
	if (addToMaps) edges.push(...addToMaps.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]))

	// Add the lesson relationships (optional)
	if (addToLessons) edges.push(...addToLessons.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]))

	const pin: PinType = await createNodeWithEdges(validatedPinData, edges)

	// // Add the pin to a route (optional)
	if (addToRoute) await addPinToRoute(pin, addToRoute, ownerUid)

	return pin
}
