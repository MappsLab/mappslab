// @flow
import type { PinType, NewPinInput } from '../PinTypes'
import type { GraphQLContext } from '../../shared/sharedTypes'

export const addPin = async (_: Object, { input }: NewPinInput, ctx: GraphQLContext): Promise<PinType | null | Error> => {
	const newPin = await ctx.models.Pin.addPin(ctx.viewer, input)
	return newPin
}
