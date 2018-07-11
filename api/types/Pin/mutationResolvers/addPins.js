// @flow
import type { PinType, NewPinInput } from '../PinTypes'
import type { GraphQLContext } from '../../shared/sharedTypes'
import pubsub, { MAP_RECEIVED_PIN } from '../../subscriptions'

export const addPin = async (_: Object, { input }: NewPinInput, ctx: GraphQLContext): Promise<PinType | Error> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new pins. Please log in and try again.')
	const newPin = await ctx.models.Pin.createPin(input, ctx.viewer.uid)
	// Query the DB for the new pin so we can include relational data in the subscription filter
	const pin = await ctx.models.Pin.getPin(newPin.uid)
	if (input.mapUids) {
		pubsub.publish(MAP_RECEIVED_PIN, { [MAP_RECEIVED_PIN]: pin })
	}
	return pin
}
