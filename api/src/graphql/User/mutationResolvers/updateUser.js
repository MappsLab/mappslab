// @flow

import type { UserType, UpdateUserData } from 'Types/UserTypes'
import type { GraphQLContext } from 'Types/sharedTypes'

export const updateUser = async (
	_: any,
	{ input }: { input: UpdateUserData },
	ctx: GraphQLContext,
): Promise<UserType> => {
	if (!input.uid && !ctx.viewer.roles.includes('teacher'))
		throw new Error('You must be logged in to update your information')

	return ctx.models.User.updateUser(input)
}
