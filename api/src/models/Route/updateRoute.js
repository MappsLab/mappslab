// @flow
import type { RouteType, UpdateRouteData } from 'Types/RouteTypes'
import { mutateNode, createEdge, removeEdge } from 'Database'
import { getRoute } from './readRoute'
import { clean, validateUpdate } from './routeDBSchema'
import Image from '../Image'

export const updateRoute = async (
	args: UpdateRouteData,
	ownerUid: string,
): Promise<RouteType> => {
	const { uid, pins, image, ...routeData } = args
	const route = await getRoute(uid)
	if (!route) throw new Error(`No route with a uid of ${uid} was found`)
	if (route.owner.uid !== ownerUid)
		throw new Error('You can only update routes that you own')

	const cleaned = await clean(routeData)
	const validatedRouteData = await validateUpdate(cleaned)

	const edges =
		pins && pins.length
			? pins.map((pinUid, order) => [
					{
						toUid: pinUid,
						pred: 'includes_pin',
						facets: {
							order,
						},
					},
					{},
			  ])
			: []

	if (args.video === null)
		await removeEdge({ fromUid: uid, pred: 'video', toUid: '*' })

	if (args.imageUrl === null)
		await removeEdge({ fromUid: uid, pred: 'imageUrl', toUid: '*' })

	if (image) {
		const pinImage = await Image.createImage(image)
		await createEdge(
			{ fromUid: uid, pred: 'has_image', toUid: pinImage.uid },
			{ unique: true },
		)
	} else if (image === null) {
		await removeEdge({ fromUid: uid, pred: 'has_image', toUid: '*' })
	}

	const mutated = await mutateNode(uid, { data: validatedRouteData, edges })
	return mutated
}

type AddPinArgs = {
	routeUid: string,
	pinUid: string,
	connectToPin?: string,
	position?: 'BEFORE' | 'AFTER',
}

export const addPin = async (
	{ routeUid: uid, pinUid, connectToPin, position }: AddPinArgs,
	ownerUid: string,
): Promise<RouteType> => {
	const route = await getRoute(uid)
	if (!route) throw new Error(`No route with a uid of ${uid} was found`)
	const originalPins = route.pins ? route.pins.map((p) => p.uid) : []
	// Create an updated array of edges with the proper sort order
	const connectedPinIndex = originalPins.findIndex((p) => p === connectToPin)
	const sliceIndex =
		position === 'BEFORE' ? connectedPinIndex : connectedPinIndex + 1

	const pins = [
		...originalPins.slice(0, sliceIndex),
		pinUid,
		...originalPins.slice(sliceIndex),
	]
	const updated = await updateRoute({ uid, pins }, ownerUid)
	return updated
}
