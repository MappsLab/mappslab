// @flow
import type { PinType, NewPinData } from 'Types/PinTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import pubsub from '../../subscriptions'
import { MAP_RECEIVED_PIN } from '../subscriptionResolvers/pinSubscriptions'

export const createPin = async (_: Object, { input }: { input: NewPinData }, ctx: GraphQLContext): Promise<PinType> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new pins. Please log in and try again.')
	const newPin = await ctx.models.Pin.createPin(input, ctx.viewer.uid)
	// Query the DB for the new pin so we can include relational data in the subscription filter
	const pin = await ctx.models.Pin.getPin(newPin.uid)
	if (!pin) throw new Error('There was an error creating a new pin')
	if (input.addToMaps) {
		pubsub.publish(MAP_RECEIVED_PIN, { [MAP_RECEIVED_PIN]: pin })
	}
	return pin
}
