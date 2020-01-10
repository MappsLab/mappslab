// @flow

import type { PinType, GetPinArgs } from 'Types/PinTypes'
import type { GraphQLContext } from 'Types/sharedTypes'

type GetPinInput = {
	input: GetPinArgs,
}

export const pin = (
	_: Object,
	{ input }: GetPinInput,
	ctx: GraphQLContext,
): Promise<PinType | null> => ctx.models.Pin.getPin(input.uid)
