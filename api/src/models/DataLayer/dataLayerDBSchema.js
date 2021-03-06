// @flow
import Joi from '@hapi/joi'
// import { merge } from 'ramda'

/**
 * Schema
 */

export const dataLayerSchema = () =>
	Joi.object().keys({
		uri: Joi.string()
			.regex(/\.kml$/)
			.required(),
		title: Joi.string().required(),
		type: Joi.any()
			.only('dataLayer')
			.default('dataLayer'),
		deleted: Joi.boolean().default(false),
	})

type NewDataLayerData = $Rest<DataLayerType, {| uid: string |}>

export const validateNew = (data: NewDataLayerData) =>
	Joi.validate(data, dataLayerSchema(true))
// export const validateUpdate = (mapData: UpdateMapData) => Joi.validate(mapData, mapSchema(false))

export const publicFields = [
	//
	'uid',
	'type',
	'uri',
	'title',
	'deleted',
].join('\n')

/**
 * Clean
 */

// export const clean = async (mapData: $Shape<U>): Promise<UpdateMapData> =>
// 	promisePipe(merge(defaultValues), filterNullAndUndefined)(mapData)
