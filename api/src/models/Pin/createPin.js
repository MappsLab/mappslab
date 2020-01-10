// @flow
import type { PinType, NewPinData } from 'Types/PinTypes'
import type { RouteType } from 'Types/RouteTypes'
import { createNodeWithEdges } from 'Database'
import { getPin } from './readPin'
import { getRoute } from '../Route/readRoute'
import Route from '../Route'
import { clean, defaultValues, validateNew } from './pinDBSchema'

// const debug = require('debug')('api')

type AddToRouteArgs = $PropertyType<NewPinData, 'addToRoute'>

const addPinToRoute = async (
	pin: PinType,
	addToRoute: AddToRouteArgs,
	ownerUid: string,
): Promise<RouteType> => {
	if (!addToRoute)
		throw new Error('You did not supply an `addToRoute` to the arguments')
	const { connectToPin, position: suppliedPosition } = addToRoute
	const position = suppliedPosition || 'AFTER'
	/* If `connectToPin` was supplied, add it to the array of pins in the route. Only used when createing a route */
	// const pins = [connectToPin, pin.uid].filter(Boolean)
	const siblingPin = await getPin(connectToPin)
	if (!siblingPin)
		throw new Error(`A pin with the id ${connectToPin} was not found`)
	const existingRoute =
		siblingPin && siblingPin.route
			? await getRoute(siblingPin.route.route.uid)
			: false
	if (existingRoute && existingRoute.owner.uid !== ownerUid)
		throw new Error('You can only add to a route that you own')
	const route = existingRoute
		? await Route.addPin(
				{
					routeUid: existingRoute.uid,
					pinUid: pin.uid,
					connectToPin,
					position,
				},
				ownerUid,
		  )
		: await Route.createRoute(
				{
					pins:
						position === 'BEFORE'
							? [pin.uid, connectToPin]
							: [connectToPin, pin.uid],
				},
				ownerUid,
		  )
	return route
}

export const createPin = async (
	args: NewPinData,
	ownerUid: string,
): Promise<PinType> => {
	const { addToMaps, addToLessons, addToRoute, ...pinData } = args
	const cleaned = await clean({
		...defaultValues,
		...pinData,
		createdAt: new Date(),
	})
	const validatedPinData = await validateNew(cleaned)
	const edges = []

	// Add the owner relationship (required)
	edges.push([{ fromUid: ownerUid, pred: 'pinned' }, {}])

	// Add the map relationship (optional)
	if (addToMaps)
		edges.push(
			...addToMaps.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]),
		)

	// Add the lesson relationships (optional)
	if (addToLessons)
		edges.push(
			...addToLessons.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]),
		)

	const pin: PinType = await createNodeWithEdges(validatedPinData, edges)
	// // Add the pin to a route (optional)
	if (addToRoute) await addPinToRoute(pin, addToRoute, ownerUid)
	return pin
}
