// @flow

import type { PinType, GetPinArgs } from '../PinTypes'
import type { GraphQLContext } from '../../shared/sharedTypes'

type GetPinInput = {
	input: GetPinArgs,
}

export const pin = (_: Object, { input }: GetPinInput, ctx: GraphQLContext): Promise<PinType | null | Error> =>
	ctx.models.Pin.getPin(input.uid)
