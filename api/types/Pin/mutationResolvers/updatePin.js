// @flow
import type { PinType, UpdatePinInput } from '../PinTypes'
import type { GraphQLContext } from '../../shared/sharedTypes'
import pubsub, { MAP_RECEIVED_PIN } from '../../subscriptions'

export const updatePin = async (_: Object, { input }: UpdatePinInput, ctx: GraphQLContext): Promise<PinType | Error> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new pins. Please log in and try again.')
	const existingPin = await ctx.models.Pin.getPin(input.uid)
	if (!existingPin) throw new Error('This pin does not exist')
	if (existingPin.owner.uid !== ctx.viewer.uid) throw new Error('You can only update your own pins')

	const newPin = await ctx.models.Pin.updatePin(input, ctx.viewer.uid)
	// // Query the DB for the new pin so we can include relational data in the subscription filter
	const pin = await ctx.models.Pin.getPin(newPin.uid)
	if (pin.maps) pubsub.publish(MAP_RECEIVED_PIN, { [MAP_RECEIVED_PIN]: pin })

	return pin
}
