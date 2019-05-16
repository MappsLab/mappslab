// @flow

import Joi from '@hapi/joi'
import type { ImageType } from 'Types/ImageTypes'

/**
 * Schema
 */

const imageSizeSchema = Joi.object().keys({
	uri: Joi.string().required(),
	width: Joi.number()
		.positive()
		.required(),
	height: Joi.number()
		.positive()
		.required(),
	createdAt: Joi.date().default(new Date()),
	label: Joi.string().max(30),
	format: Joi.string().required(),
})
// .options({ stripUnknown: true })

export const imageSchema = Joi.object().keys({
	createdAt: Joi.date().default(new Date()),
	updatedAt: Joi.date().default(new Date()),
	// .required(),
	sizes: Joi.array().items(imageSizeSchema),
	original: imageSizeSchema.required(),
	type: Joi.string().default('image'),
	deleted: Joi.boolean().default(false),
})
// .options({ stripUnknown: true })

type NewImageData = $Rest<ImageType, {| uid: string |}>

export const validateNew = (imageData: NewImageData): NewImageData => Joi.validate(imageData, imageSchema)

const sizeFields = ['uri', 'width', 'height', 'label', 'format', 'createdAt', 'updatedAt']

export const publicFields = [
	'uid',
	`sizes {
		${sizeFields.join(',')}
	}`,
	sizeFields.map((field) => `original.${field}`),
	'createdAt',
	'updatedAt',
].join(',')
