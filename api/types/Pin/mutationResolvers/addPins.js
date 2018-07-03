// @flow
import type { PinType, NewPinInput } from '../PinTypes'
import type { GraphQLContext } from '../../shared/sharedTypes'

export const addPin = async (_: Object, { input }: NewPinInput, ctx: GraphQLContext): Promise<PinType | null | Error> => {
	if (!ctx.viewer) throw Error('You must be logged in to create new pins. Please log in and try again.')
	return ctx.models.Pin.createPin(input, ctx.viewer.uid)
}
