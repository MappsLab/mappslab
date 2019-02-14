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
		throw new UserError('You must be an admin or teacher to add new students')
	}
	const user = await ctx.models.User.createUser({ ...input, roles: ['student'] })
	return user
}

export const createTeacher = async (_: mixed, args: { input: NewUserData }, ctx: GraphQLContext): Promise<UserType> => {
	if (!ctx.viewer || (!ctx.viewer.roles.includes('teacher') && !ctx.viewer.roles.includes('admin'))) {
		throw new UserError('You must be an admin or teacher to add new teachers')
	}
	const { input } = args || {}
	const user = await ctx.models.User.createUser({ ...input, roles: ['teacher'] })
	return user
}

export const createAdmin = async (_: mixed, args: { input: NewUserData }, ctx: GraphQLContext): Promise<UserType> => {
	if (!ctx.viewer || !ctx.viewer.roles.includes('admin')) throw new UserError('You must be an admin to add new admins')
	const { input } = args || {}
	const user = await ctx.models.User.createUser({ ...input, roles: ['admin'] })
	return user
}
