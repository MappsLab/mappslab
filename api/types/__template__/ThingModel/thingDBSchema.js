// @flow
import Joi from 'joi'
import type { ThingInput } from '../ThingTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'

/**
 * Schema
 */

export const thingSchema = (isNew: boolean = true) =>
	Joi.object().keys({
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
		type: Joi.any().only('thing'),
	})

export const defaultValues = {
	type: 'thing',
	updatedAt: new Date(),
}

export const validateNew = (thingData: ThingInput) => Joi.validate(thingData, thingSchema(true))
export const validateUpdate = (thingData: ThingInput) => Joi.validate(thingData, thingSchema(false))

/**
 * Clean
 */

export const clean = async (thingData: ThingInput = {}): Promise<ThingInput> => promisePipe(filterNullAndUndefined)(thingData)
