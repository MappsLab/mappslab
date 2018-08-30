// @flow
import Joi from 'joi'
import { when, prop } from 'ramda'
import bcrypt from 'bcrypt'
import type { UserInput } from 'Types/UserTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'

/**
 * Schema
 */

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
		email: Joi.any().when('roles', {
			is: Joi.array().items(Joi.valid('teacher', 'admin')),
			then: Joi.string()
				.email()
				.required(),
			otherwise: Joi.string().email(),
		}),
		password: Joi.string(),
		temporaryPassword: Joi.string(),
		createdAt: isNew ? Joi.date().required() : Joi.any().forbidden(),
		updatedAt: Joi.date().required(),
		roles: Joi.array().items(Joi.valid('student', 'teacher', 'admin')),
		type: Joi.any().only('user'),
		disabled: Joi.boolean().required(),
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
	)(userData)
