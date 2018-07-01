// @flow
import Joi from 'joi'
import type { MapInput } from '../MapTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'

/**
 * Schema
 */

export const mapSchema = (isNew: boolean = true) =>
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
		createdAt: isNew ? Joi.date().required() : Joi.any().forbidden(),
		updatedAt: Joi.date().required(),
		description: Joi.string(),
		type: Joi.any().only('map'),
	})

export const defaultValues = {
	type: 'map',
	updatedAt: new Date(),
}

export const validateNew = (mapData: MapInput) => Joi.validate(mapData, mapSchema(true))
export const validateUpdate = (mapData: MapInput) => Joi.validate(mapData, mapSchema(false))

/**
 * Clean
 */

export const clean = async (mapData: MapInput = {}): Promise<MapInput> => promisePipe(filterNullAndUndefined)(mapData)
