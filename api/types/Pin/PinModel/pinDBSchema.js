// @flow
import Joi from 'joi'
import { pipe, head } from 'ramda'
import type { NewPinArgs, PinType } from '../PinTypes'
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
		lat: isNew ? Joi.number().required() : Joi.number(),
		lang: isNew ? Joi.number().required() : Joi.number(),
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
export const validateUpdate = (pinData: NewPinArgs) => Joi.validate(pinData, pinSchema(false))

/**
 * Clean
 */

export const clean = async (pinData: NewPinArgs = {}): Promise<NewPinArgs> => promisePipe(filterNullAndUndefined)(pinData)

/**
 * Parse
 */

export const parsePinResult = (o: Array<Object>): PinType | null => (o.length ? pipe(head)(o) : null)
