// @flow
import type { RemovePinInput } from 'Types/PinTypes'
import type { GraphQLContext, Success } from 'Types/sharedTypes'
import pubsub from '../../subscriptions'
import { PIN_DELETED } from '../subscriptionResolvers/pinSubscriptions'

export const deletePin = async (
	_: Object,
	{ input }: { input: RemovePinInput },
	ctx: GraphQLContext,
): Promise<Success> => {
	if (!ctx.viewer)
		throw Error(
			'You must be logged in to remove pins. Please log in and try again.',
		)
	// Fetch the pin before it is deleted so the subscription can determine if it was in a subscribed map
	const pin = await ctx.models.Pin.getPin(input.uid)
	const { success, messages } = await ctx.models.Pin.deletePin(
		input,
		ctx.viewer,
	)
	if (pin && success) {
		pubsub.publish(PIN_DELETED, { [PIN_DELETED]: pin })
	}
	return { success, messages }
}
