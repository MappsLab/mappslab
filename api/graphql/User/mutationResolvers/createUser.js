// @flow
import type { NewUserData, UserType } from 'Types/UserTypes'
import type { GraphQLContext } from 'Types/sharedTypes'
import { UserError } from 'Errors'

export const createStudent = async (
	_: mixed,
	{ input }: { input: NewUserData, assignToClassrooms: Array<string> },
	ctx: GraphQLContext,
): Promise<UserType> => {
	if (!ctx.viewer || (!ctx.viewer.roles.includes('teacher') && !ctx.viewer.roles.includes('admin'))) {
		throw new UserError('You must be an admin to add new teachers')
	}
	const user = await ctx.models.User.createUser(input)
	// if (assignToClassrooms) {
	// 	ctx.models.User.assignToClassrooms(user.uid, assignToClassrooms)
	// }
	return user
}

export const createTeacher = async (_: mixed, args: { input: NewUserData }, ctx: GraphQLContext): Promise<UserType> => {
	if (!ctx.viewer || !ctx.viewer.roles.includes('admin')) throw new UserError('You must be an admin to add new teachers')
	const { input } = args || {}
	const user = await ctx.models.User.createUser(input)
	return user
}
