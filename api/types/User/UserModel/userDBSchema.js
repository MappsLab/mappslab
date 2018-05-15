// @flow
import Joi from 'joi'
import type { UserInput } from '../UserTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'

/**
 * Schema
 */

export const userSchema = (isNew: boolean = true) =>
	Joi.object().keys({
		uid: process.env.TEST_DB === 'true' ? Joi.string() : Joi.any().forbidden(),
		title: isNew
			? Joi.string()
					.min(3)
					.max(35)
					.required()
			: Joi.string()
					.min(3)
					.max(35),
		lat: isNew ? Joi.number().isRequired() : Joi.number(),
		lang: isNew ? Joi.number().isRequired() : Joi.number(),
		createdAt: isNew ? Joi.date().required() : Joi.any().forbidden(),
		updatedAt: Joi.date().required(),
		type: Joi.any().only('user'),
	})

export const defaultValues = {
	type: 'user',
	updatedAt: new Date(),
}

export const validateNew = (userData: UserInput) => Joi.validate(userData, userSchema(true))
export const validateUpdate = (userData: UserInput) => Joi.validate(userData, userSchema(false))

/**
 * Clean
 */

export const clean = async (userData: UserInput = {}): Promise<UserInput> => promisePipe(filterNullAndUndefined)(userData)
