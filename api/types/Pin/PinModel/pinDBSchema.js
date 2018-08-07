// @flow
import Joi from 'joi'
import { pipe, head, assoc } from 'ramda'
import type { NewPinArgs, UpdatePinArgs, PinType } from '../PinTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'

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

export const validateNew = (pinData: NewPinArgs) => Joi.validate(pinData, pinSchema(true))
export const validateUpdate = (pinData: UpdatePinArgs) => Joi.validate(pinData, pinSchema(false))

/**
 * Clean
 */

export const clean = async (pinData: NewPinArgs | UpdatePinArgs): Promise<NewPinArgs | UpdatePinArgs> =>
	promisePipe(filterNullAndUndefined, assoc('updatedAt', new Date()))(pinData)

/**
 * Parse
 */

export const parsePinResult = (o: Array<Object>): PinType | null => (o.length ? pipe(head)(o) : null)
