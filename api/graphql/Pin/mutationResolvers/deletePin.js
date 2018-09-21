// @flow
import type { PinType, RemovePinInput } from 'Types/PinTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import pubsub, { MAP_RECEIVED_PIN } from '../../subscriptions'

export const deletePin = async (
	_: Object,
	{ input }: { input: RemovePinInput },
	ctx: GraphQLContext,
): Promise<PinType | Error> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new pins. Please log in and try again.')
	const newPin = await ctx.models.Pin.createPin(input, ctx.viewer.uid)

	// Query the DB for the new pin so we can include relational data in the subscription filter
	const pin = await ctx.models.Pin.getPin(newPin.uid)
	if (input.addToMaps) {
		pubsub.publish(MAP_RECEIVED_PIN, { [MAP_RECEIVED_PIN]: pin })
	}
	return pin
}
