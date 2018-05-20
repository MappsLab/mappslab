// @flow
import Joi from 'joi'
import { when, prop } from 'ramda'
import bcrypt from 'bcrypt-as-promised'
import type { UserInput } from '../UserTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'

/**
 * Schema
 */

export const userSchema = (isNew: boolean = true) =>
	Joi.object().keys({
		uid: process.env.TEST_DB === 'true' ? Joi.string() : Joi.any().forbidden(),
		name: isNew
			? Joi.string()
					.min(3)
					.max(35)
					.required()
			: Joi.string()
					.min(3)
					.max(35),
		email: Joi.any().when('role', {
			is: 'student',
			then: Joi.string().email(),
			otherwise: Joi.string()
				.email()
				.required(),
		}),
		password: Joi.string(),
		createdAt: isNew ? Joi.date().required() : Joi.any().forbidden(),
		updatedAt: Joi.date().required(),
		role: Joi.valid('student', 'teacher', 'admin'),
		type: Joi.any().only('user'),
		disabled: Joi.boolean().required(),
	})

export const defaultValues = {
	type: 'user',
	role: 'student',
	disabled: false,
	updatedAt: new Date(),
}

export const validateNew = (userData: UserInput) => Joi.validate(userData, userSchema(true))
export const validateUpdate = (userData: UserInput) => Joi.validate(userData, userSchema(false))

export const publicFields = ['name', 'role', 'type', 'uid'].join('\n')
export const viewerFields = ['email', 'disabled'].join('\n')

/**
 * Clean
 */
const SALT_FACTOR = 5

const hashPassword = (obj) =>
	new Promise(async (resolve) => {
		const { password } = obj
		if (!password) {
			resolve(obj)
			return
		}
		const hashedPassword = await bcrypt.hash(password, SALT_FACTOR)
		resolve({
			...obj,
			password: hashedPassword,
		})
	})

export const clean = async (userData: UserInput = {}): Promise<UserInput> =>
	promisePipe(
		// Filter out 'undefined' values
		filterNullAndUndefined,
		// When a new password is supplied, hash it
		when(prop('password'), hashPassword),
	)(userData)
