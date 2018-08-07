// @flow
import Joi from 'joi'
import { pipe, head, assoc, dissoc, when, propEq, map } from 'ramda'
import type { NewPinArgs, UpdatePinArgs, PinType } from '../PinTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'
import { parseSingularFields } from '../../../utils/parsing'

/**
 * Schema
 */

export const pinSchema = (isNew: boolean = true) =>
	Joi.object().keys({
		title: isNew
			? Joi.string()
					.min(3)
					.max(35)
					.required()
			: Joi.string()
					.min(3)
					.max(35),
		lat: isNew ? Joi.number().required() : Joi.number(),
		lang: isNew ? Joi.number().required() : Joi.number(),
		description: Joi.string().max(400),
		createdAt: isNew ? Joi.date().required() : Joi.any().forbidden(),
		updatedAt: Joi.date().required(),
		type: Joi.any().only('pin'),
	})

export const defaultValues = {
	type: 'pin',
	updatedAt: new Date(),
}

export const publicFields = [
	'uid',
	'title',
	'lat',
	'lang',
	'description',
	'createdAt',
	'updatedAt',
	'type',
	`maps: ~has_pin {
		uid
		title
	}`,
	`owner: ~pinned {
		uid
		username
	}`,
].join('\n')

const singleFields = ['owner']

export const validateNew = (pinData: NewPinArgs) => Joi.validate(pinData, pinSchema(true))
export const validateUpdate = (pinData: UpdatePinArgs) => Joi.validate(pinData, pinSchema(false))

/**
 * Clean
 */

export const clean = async (pinData: NewPinArgs | UpdatePinArgs): Promise<NewPinArgs | UpdatePinArgs> =>
	promisePipe(filterNullAndUndefined, dissoc('addToMaps'), dissoc('addToLessons'), assoc('updatedAt', new Date()))(pinData)

/**
 * Parse
 */

const parse = pipe(
	parseSingularFields(singleFields),
	when(propEq('description', undefined), assoc('description', '')),
)

export const parsePinResult = (o: Array<Object>): PinType | null =>
	o.length
		? pipe(
				head,
				parse,
		  )(o)
		: null

export const parsePinResults = map(parse)
