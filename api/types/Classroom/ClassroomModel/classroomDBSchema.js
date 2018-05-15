// @flow
import Joi from 'joi'
import type { PinInput } from '../PinTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'

/**
 * Schema
 */

export const pinSchema = (isNew: boolean = true) =>
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
		type: Joi.any().only('pin'),
	})

export const defaultValues = {
	type: 'pin',
	updatedAt: new Date(),
}

export const validateNew = (pinData: PinInput) => Joi.validate(pinData, pinSchema(true))
export const validateUpdate = (pinData: PinInput) => Joi.validate(pinData, pinSchema(false))

/**
 * Clean
 */

export const clean = async (pinData: PinInput = {}): Promise<PinInput> => promisePipe(filterNullAndUndefined)(pinData)
