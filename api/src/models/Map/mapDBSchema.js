// @flow
import Joi from 'joi'
import { pipe, head, assoc, when, propEq, map } from 'ramda'
import type { UpdateMapData, NewMapData, MapType } from 'Types/MapTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'
import { parseSingularFields } from 'Utils/parsing'

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
		description: Joi.string().max(1200),
		type: Joi.any().only('map'),
		deleted: isNew ? Joi.boolean().default(false) : Joi.boolean(),
	})

export const defaultValues = {
	type: 'map',
	updatedAt: new Date(),
}

export const validateNew = (mapData: NewMapData) => Joi.validate(mapData, mapSchema(true))
export const validateUpdate = (mapData: UpdateMapData) => Joi.validate(mapData, mapSchema(false))

export const publicFields = ['uid', 'title', 'description', 'slug', 'createdAt', 'updatedAt', 'type'].join('\n')

/**
 * Clean
 */

export const clean = async (mapData: $Shape<UpdateMapData>): Promise<UpdateMapData> =>
	promisePipe(filterNullAndUndefined)(mapData)

/**
 * Parse
 */

const singleFields = []
const parse = pipe(
	// $FlowFixMe
	parseSingularFields(singleFields),
	when(propEq('description', undefined), assoc('description', '')),
)

export const parseMapResult = (o: Array<Object>): MapType | null =>
	o.length
		? pipe(
				head,
				parse,
		  )(o)
		: null

export const parseMapResults = map(parse)
