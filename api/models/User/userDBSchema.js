// @flow
import Joi from 'joi'
import { when, prop, assoc } from 'ramda'
import bcrypt from 'bcrypt'
import type { UserInput } from 'Types/UserTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'

/**
 * Schema
 */

const roles = Joi.array().items(Joi.valid('student', 'teacher', 'admin'))

export const userSchema = (isNew: boolean = true) =>
	Joi.object().keys({
		name: isNew
			? Joi.string()
					.min(3)
					.max(35)
					.required()
			: Joi.string()
					.min(3)
					.max(35),
		email: isNew
			? Joi.any().when('roles', {
					is: Joi.array().items(Joi.valid('teacher', 'admin')),
					then: Joi.string()
						.email()
						.required(),
					otherwise: Joi.string().email(),
			  })
			: Joi.string(),
		password: Joi.string(),
		temporaryPassword: Joi.string(),
		temporaryPasswordExpires: Joi.date(),
		passwordReset: Joi.object().keys({
			token: Joi.string().required(),
			expires: Joi.date().required(),
		}),
		requiresReset: Joi.boolean(),
		createdAt: isNew ? Joi.date().required() : Joi.any().forbidden(),
		updatedAt: Joi.date().required(),
		roles: isNew ? roles.required() : roles,
		type: isNew
			? Joi.any()
					.only('user')
					.required()
			: Joi.any().only('user'),
		disabled: isNew ? Joi.boolean().required() : Joi.boolean(),
	})

export const defaultValues = {
	type: 'user',
	roles: ['student'],
	disabled: false,
	updatedAt: new Date(),
}

export const validateNew = (userData: UserInput) => Joi.validate(userData, userSchema(true))
export const validateUpdate = (userData: UserInput) => Joi.validate(userData, userSchema(false))

export const publicFields = ['name', 'roles', 'type', 'uid'].join('\n')
export const viewerFields = ['email', 'disabled'].join('\n')

/**
 * Clean
 */
const SALT_FACTOR = 5

const hashPassword = (key: 'password' | 'temporaryPassword') => (obj) =>
	new Promise(async (resolve) => {
		const value = obj[key]
		if (!value) {
			resolve(obj)
			return
		}
		const hashedPassword = await bcrypt.hash(value, SALT_FACTOR)
		resolve({
			...obj,
			[key]: hashedPassword,
		})
	})

export const clean = async (userData: UserInput = {}): Promise<UserInput> =>
	promisePipe(
		// Filter out 'undefined' values
		filterNullAndUndefined,
		// When a new password is supplied, hash it
		when(prop('password'), hashPassword('password')),
		when(prop('temporaryPassword'), hashPassword('temporaryPassword')),
		assoc('updatedAt', new Date()),
	)(userData)
