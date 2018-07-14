// @flow
import Joi from 'joi'
import type { RouteInput } from '../RouteTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'

/**
 * Schema
 */

export const routeSchema = (isNew: boolean = true) =>
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
		type: Joi.any().only('route'),
	})

export const defaultValues = {
	type: 'route',
	updatedAt: new Date(),
}

export const validateNew = (routeData: RouteInput) => Joi.validate(routeData, routeSchema(true))
export const validateUpdate = (routeData: RouteInput) => Joi.validate(routeData, routeSchema(false))

/**
 * Clean
 */

export const clean = async (routeData: RouteInput = {}): Promise<RouteInput> => promisePipe(filterNullAndUndefined)(routeData)
