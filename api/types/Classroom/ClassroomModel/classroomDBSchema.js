// @flow
import Joi from 'joi'
import type { ClassroomInput } from '../ClassroomTypes'
import { promisePipe, filterNullAndUndefined } from '../../../utils'

/**
 * Schema
 */

export const classroomSchema = (isNew: boolean = true) =>
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
		type: Joi.any().only('classroom'),
		disabled: Joi.boolean(),
	})

export const defaultValues = {
	type: 'classroom',
	updatedAt: new Date(),
}

export const validateNew = (classroomData: ClassroomInput) => Joi.validate(classroomData, classroomSchema(true))
export const validateUpdate = (classroomData: ClassroomInput) => Joi.validate(classroomData, classroomSchema(false))

/**
 * Clean
 */

export const clean = async (classroomData: ClassroomInput = {}): Promise<ClassroomInput> =>
	promisePipe(filterNullAndUndefined)(classroomData)
