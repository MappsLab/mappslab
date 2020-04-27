// @flow
import Joi from '@hapi/joi'
import { when, prop, assoc } from 'ramda'
import bcrypt from 'bcrypt'
import { promisePipe } from 'Utils'
import type { NewUserData, UpdateUserData } from 'Types/UserTypes'

/**
 * Schema
 */

const roles = Joi.array().items(Joi.valid('student', 'teacher', 'admin'))

export const userSchema = (isNew: boolean = true) =>
	Joi.object({
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
		temporaryPassword: Joi.string().allow(null),
		temporaryPasswordExpires: Joi.any().when('temporaryPassword', {
			is: null,
			then: Joi.valid(null),
			otherwise: Joi.date().default(new Date(Date.now() + 3600000)),
		}),
		passwordReset: Joi.object().keys({
			token: Joi.string()
				.required()
				.allow(null),
			expires: Joi.date()
				.required()
				.allow(null),
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
		deleted: isNew ? Joi.boolean().default(false) : Joi.boolean(),
	})

export const defaultValues = {
	type: 'user',
	roles: ['student'],
	disabled: false,
	updatedAt: new Date(),
}

export const validateNew = (userData: NewUserData) =>
	userSchema(true).validate(userData)
export const validateUpdate = (userData: UpdateUserData) =>
	Joi.validate(userData, userSchema(false))

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

export const clean = async <T>(x: T): Promise<T> =>
	promisePipe(
		// Filter out 'undefined' values
		// filterNullAndUndefined,
		// When a new password is supplied, hash it
		when(prop('password'), hashPassword('password')),
		when(prop('temporaryPassword'), hashPassword('temporaryPassword')),
		assoc('updatedAt', new Date()),
	)(x)
