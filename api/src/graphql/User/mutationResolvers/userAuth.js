// @flow
import type { GraphQLContext, Success } from 'Types/sharedTypes'
import type { Credentials, ViewerType, PasswordResetInput, JWT, GetUserInput, SetTemporaryPasswordInput } from 'Types/UserTypes'
import { createJWT } from 'Utils/auth'
import { ValidationError } from 'Errors'

// const debug = require('debug')('api')

export const loginViewer = async (
	_: mixed,
	args: { input: Credentials },
	ctx: GraphQLContext,
): Promise<{ viewer: ViewerType, jwt: JWT } | { resetToken: string }> => {
	const { input } = args
	const viewer = await ctx.models.User.checkPassword(input)
	if (viewer && !viewer.requiresReset) {
		const jwt = createJWT(viewer)
		return {
			viewer,
			jwt,
		}
	}
	if (viewer && viewer.uid && viewer.requiresReset) {
		const { token } = await ctx.models.User.createResetToken(viewer.uid)
		return { resetToken: token }
	}
	throw new ValidationError('Incorrect password.')
}

export const requestPasswordReset = async (
	_: mixed,
	{ input }: { input: GetUserInput },
	ctx: GraphQLContext,
): Promise<Success> => {
	const user = await ctx.models.User.getUser(input)
	if (user) {
		await ctx.models.User.createResetToken(user.uid)
	}
	return {
		success: true,
		messages: [],
	}
}

export const resetPassword = async (
	_: mixed,
	{ input }: { input: PasswordResetInput },
	ctx: GraphQLContext,
): Promise<{ viewer: ViewerType, jwt: JWT } | { resetToken: string }> => {
	const user = await ctx.models.User.resetPassword(input)
	const jwt = createJWT(user)
	return {
		viewer: user,
		jwt,
	}
}

export const setTemporaryPassword = async (
	_: mixed,
	{ input }: { input: SetTemporaryPasswordInput },
	ctx: GraphQLContext,
): Promise<Success> => {
	const { viewer } = ctx
	const result = ctx.models.User.setTemporaryPassword(input, viewer)
	return result
}
