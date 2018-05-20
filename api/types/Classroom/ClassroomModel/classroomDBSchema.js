// @flow
import Joi from 'joi'
import { when, prop } from 'ramda'
import type { ClassroomInput } from '../ClassroomTypes'
import { promisePipe, filterNullAndUndefined, createSlugFrom } from '../../../utils'

/**
 * Schema
 */

const SLUG_LENGTH = 35

export const classroomSchema = (isNew: boolean = true) =>
	Joi.object().keys({
		uid: process.env.TEST_DB === 'true' ? Joi.string() : Joi.any().forbidden(),
		slug: Joi.any().when('title', {
			is: Joi.exist(),
			then: Joi.string()
				.regex(/^[a-z0-9-_]+$/)
				.min(1)
				.max(SLUG_LENGTH)
				.required(),
		}),
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
		type: Joi.any().only('classroom'),
		disabled: Joi.boolean(),
	})

export const defaultValues = {
	type: 'classroom',
	updatedAt: new Date(),
}

export const publicFields = ['uid', 'title', 'disabled', 'createdAt', 'updatedAt'].join('\n')

export const validateNew = (classroomData: ClassroomInput) => Joi.validate(classroomData, classroomSchema(true))
export const validateUpdate = (classroomData: ClassroomInput) => Joi.validate(classroomData, classroomSchema(false))

/**
 * Clean
 */

export const clean = async (classroomData: ClassroomInput = {}): Promise<ClassroomInput> =>
	promisePipe(
		// When a title is supplied without a slug, make a slug from it
		when((o) => prop('title')(o) && !prop('slug')(o), createSlugFrom('title')),
		filterNullAndUndefined,
	)(classroomData)
