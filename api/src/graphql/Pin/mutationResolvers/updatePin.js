// @flow
import type { PinType, UpdatePinData } from 'Types/PinTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import pubsub from '../../subscriptions'
import { PIN_UPDATED } from '../subscriptionResolvers/pinSubscriptions'

export const updatePin = async (_: Object, { input }: { input: UpdatePinData }, ctx: GraphQLContext): Promise<PinType | null> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new pins. Please log in and try again.')
	const existingPin = await ctx.models.Pin.getPin(input.uid)
	if (!existingPin) throw new Error('This pin does not exist')
	if (existingPin.owner.uid !== ctx.viewer.uid) throw new Error('You can only update your own pins')
	const newPin = await ctx.models.Pin.updatePin(input)
	// // Query the DB for the new pin so we can include relational data in the subscription filter
	const pin = await ctx.models.Pin.getPin(newPin.uid)
	if (pin.maps) pubsub.publish(PIN_UPDATED, { [PIN_UPDATED]: { pin } })

	return pin
}
