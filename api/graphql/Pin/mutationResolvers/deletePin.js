// @flow
import type { PinType, RemovePinInput } from 'Types/PinTypes'
import type { GraphQLContext, Success } from 'Types/sharedTypes'
import pubsub, { MAP_REMOVED_PIN } from '../../subscriptions'

export const deletePin = async (_: Object, { input }: { input: RemovePinInput }, ctx: GraphQLContext): Promise<Success> => {
	if (!ctx.viewer) throw Error('You must be logged in to remove pins. Please log in and try again.')

	const { success, messages } = await ctx.models.Pin.deletePin(input, ctx.viewer)

	// if (success) {
	// 	const pin = await ctx.models.Pin.getPin(input.uid)
	// 	pubsub.publish(MAP_REMOVED_PIN, { [MAP_REMOVED_PIN]: pin })
	// }
	return { success, messages }
}
