// @flow
import type { PinType, UpdatePinData } from 'Types/PinTypes'
import { mutateNode, createEdge, removeEdge } from 'Database'
import { clean, validateUpdate } from './pinDBSchema'
import Image from '../Image'

export const updatePin = async (args: UpdatePinData): Promise<PinType> => {
	const { uid, addToMaps, image, ...pinData } = args
	const cleaned = await clean(pinData)
	// $FlowFixMe --- this is kind of a mess. Make separate out addPinToMaps / addPinToClassrooms
	const validatedPinData = await validateUpdate(cleaned)
	// $FlowFixMe
	const updatedPin: PinType = await mutateNode(uid, { data: validatedPinData })

	if (addToMaps) {
		await Promise.all(
			addToMaps.map((mapUid) =>
				createEdge(
					{ fromUid: mapUid, pred: 'has_pin', toUid: updatedPin.uid },
					{},
				),
			),
		)
	}

	if (args.video === null)
		await removeEdge({ fromUid: uid, pred: 'video', toUid: '*' })

	if (image) {
		const pinImage = await Image.createImage(image)
		await createEdge(
			{ fromUid: uid, pred: 'has_image', toUid: pinImage.uid },
			{ unique: true },
		)
	} else if (image === null) {
		await removeEdge({ fromUid: uid, pred: 'has_image', toUid: '*' })
	}
	return updatedPin
}
