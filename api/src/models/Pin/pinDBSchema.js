// @flow
import Joi from '@hapi/joi'
import { pipe, head, assoc, dissoc, when, propEq, map } from 'ramda'
import type { NewPinData, UpdatePinData, PinType } from 'Types/PinTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'
import { parseSingularFields } from 'Utils/parsing'

/**
 * Schema
 */

export const pinSchema = (isNew: boolean = true) =>
	Joi.object()
		.keys({
			title: Joi.string()
				.min(1)
				.max(35)
				.allow(''),
			lat: isNew ? Joi.number().required() : Joi.number(),
			lng: isNew ? Joi.number().required() : Joi.number(),
			description: Joi.string()
				.max(400)
				.allow(''),
			createdAt: isNew ? Joi.date().required() : Joi.any().forbidden(),
			updatedAt: Joi.date().required(),
			type: Joi.any().only('pin'),
			video: Joi.string()
				.uri()
				.trim(),
			deleted: isNew ? Joi.boolean().default(false) : Joi.boolean(),
			draft: Joi.boolean().default(false),
		})
		.options({ stripUnknown: true })

export const defaultValues = {
	type: 'pin',
	updatedAt: new Date(),
	draft: false,
}

export const publicFields = [
	'uid',
	'title',
	'draft',
	'lat',
	'lng',
	'description',
	'createdAt',
	'updatedAt',
	'type',
	'video',
	`maps: ~has_pin {
		uid
		title
	}`,
	`owner: ~pinned {
		uid
		username
	}`,
	`route.route: ~includes_pin {
		uid
	}`,
].join('\n')

const singleFields = ['owner', 'route.route']

export const validateNew = (pinData: NewPinData): Promise<NewPinData> => Joi.validate(pinData, pinSchema(true))
export const validateUpdate = (pinData: UpdatePinData): Promise<UpdatePinData> => Joi.validate(pinData, pinSchema(false))

/**
 * Clean
 */

export const clean = async <T>(pinData: T): Promise<T> =>
	promisePipe(filterNullAndUndefined, dissoc('addToMaps'), dissoc('addToLessons'), assoc('updatedAt', new Date()))(pinData)

/**
 * Parse
 */

const parse = pipe(
	// $FlowFixMe
	parseSingularFields(singleFields),
	when(propEq('description', undefined), assoc('description', '')),
	when(propEq('draft', undefined), assoc('draft', false)),
)

export const parsePinResult = (o: Array<Object>): PinType | null =>
	o.length
		? pipe(
				head,
				parse,
		  )(o)
		: null

export const parsePinResults = map(parse)
