// @flow
import Joi from '@hapi/joi'
// import { merge } from 'ramda'
import type { TilesetType } from 'Types/TileTypes'

/**
 * Schema
 */

export const tilesetSchema = (isNew: boolean = true) =>
	Joi.object().keys({
		baseUri: isNew ? Joi.string().required() : Joi.any.forbidden(),
		maxZoom: Joi.number().required(),
		createdAt: isNew ? Joi.date().default(new Date()) : Joi.any().forbidden(),
		updatedAt: Joi.date().default(new Date()),
		type: Joi.any()
			.only('tileset')
			.default('tileset'),
		deleted: Joi.boolean().default(false),
	})

type NewTilesetData = $Rest<TilesetType, {| uid: string |}>

export const validateNew = (data: NewTilesetData) =>
	Joi.validate(data, tilesetSchema(true))
// export const validateUpdate = (mapData: UpdateMapData) => Joi.validate(mapData, mapSchema(false))

export const publicFields = [
	//
	'uid',
	'baseUri',
	'maxZoom',
	'deleted',
].join('\n')

/**
 * Clean
 */

// export const clean = async (mapData: $Shape<U>): Promise<UpdateMapData> =>
// 	promisePipe(merge(defaultValues), filterNullAndUndefined)(mapData)
