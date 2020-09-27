// @flow
import Joi from '@hapi/joi'
import { when, prop, pipe, head, merge, map } from 'ramda'
import type { NewRouteData, UpdateRouteData, RouteType } from 'Types/RouteTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'
import { parseSingularFields } from 'Utils/parsing'

/**
 * Schema
 */

export const routeSchema = (isNew: boolean = true) =>
	Joi.object()
		.keys({
			title: Joi.string()
				.min(3)
				.max(35),
			createdAt: isNew
				? Joi.date().default(new Date()) // .required()
				: Joi.any().forbidden(),
			updatedAt: Joi.date().required(),
			description: Joi.string()
				.max(400)
				.allow(''),
			deleted: isNew ? Joi.boolean().default(false) : Joi.boolean(),
			video: Joi.string()
				.uri()
				.trim(),
			imageUrl: Joi.string()
				.uri()
				.trim(),
			type: Joi.any().only('route'),
		})
		.options({ stripUnknown: true })

export const defaultValues = {
	type: 'route',
	updatedAt: new Date(),
}

export const validateNew = (routeData: NewRouteData) =>
	Joi.validate(routeData, routeSchema(true))
export const validateUpdate = (routeData: UpdateRouteData) =>
	Joi.validate(routeData, routeSchema(false))

export const publicFields = [
	//
	'uid',
	'title',
	'updatedAt',
	'video',
	'imageUrl',
	'description',
	`pins: includes_pin @facets(order) @filter((eq(deleted, false))) {
		uid
		title
	}`,
	`owner: ~owns_route {
		uid
		username
	}`,
	'type',
].join('\n')
const singleFields = ['owner']

/**
 * Clean
 */

export const clean = <T: UpdateRouteData | NewRouteData>(
	routeData: T,
): Promise<T> =>
	promisePipe(merge(defaultValues), filterNullAndUndefined)(routeData)

/**
 * Parse
 */

const sortPins = (obj) => {
	const { pins } = obj
	const sortedPins = [...pins].sort((a, b) =>
		a['pins|order'] < b['pins|order'] ? -1 : 1,
	)
	return {
		...obj,
		pins: sortedPins,
	}
}

const parse = pipe(
	parseSingularFields(singleFields),
	// when(propEq('description', undefined), assoc('description', '')),
	when(prop('pins'), sortPins),
	(o) => o,
)

export const parseRouteResult = (o: Array<Object>): RouteType | null =>
	o.length
		? pipe(
				head,
				parse,
		  )(o)
		: null

export const parseRouteResults = map(parse)
