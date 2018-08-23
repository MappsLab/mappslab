// @flow
import Joi from 'joi'
import type { MapInput } from '../MapTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'

/**
 * Schema
 */

export const mapSchema = (isNew: boolean = true) =>
	Joi.object().keys({
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

export const publicFields = ['uid', 'title', 'description', 'slug', 'createdAt', 'updatedAt', 'type'].join('\n')

/**
 * Clean
 */

export const clean = async (mapData: MapInput = {}): Promise<MapInput> => promisePipe(filterNullAndUndefined)(mapData)
