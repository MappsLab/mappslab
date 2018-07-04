// @flow
import type { PinType, NewPinInput } from '../PinTypes'
import type { GraphQLContext } from '../../shared/sharedTypes'
import { pubsub, PIN_ADDED_TO_MAP } from '../../subscriptions'

export const addPin = async (_: Object, { input }: NewPinInput, ctx: GraphQLContext): Promise<PinType | null | Error> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new pins. Please log in and try again.')
	const newPin = ctx.models.Pin.createPin(input, ctx.viewer.uid)
	if (input.mapUids) pubsub.publish(PIN_ADDED_TO_MAP, { [PIN_ADDED_TO_MAP]: newPin })
	return newPin
}
