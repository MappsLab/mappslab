// @flow

import type { PinType, GetPinArgs } from '../PinTypes'
import type { GraphQLContext } from '../../shared/sharedTypes'

type GetPinInput = {
	input: GetPinArgs,
}

export const owner = (fetchedPin: PinType, _: GetPinInput, ctx: GraphQLContext): Promise<PinType | null | Error> =>
	ctx.models.User.getPinOwner(fetchedPin.uid)
