// @flow
import Joi from 'joi'
import { when, dissoc, prop, pipe, head, merge, map } from 'ramda'
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
				.max(35)
				.default('Untitled Route'),
			createdAt: isNew
				? Joi.date().default(new Date()) // .required()
				: Joi.any().forbidden(),
			updatedAt: Joi.date().required(),
			deleted: isNew ? Joi.boolean().default(false) : Joi.boolean(),
			type: Joi.any().only('route'),
		})
		.options({ stripUnknown: true })

export const defaultValues = {
	type: 'route',
	updatedAt: new Date(),
}

export const validateNew = (routeData: NewRouteData) => Joi.validate(routeData, routeSchema(true))
export const validateUpdate = (routeData: UpdateRouteData) => Joi.validate(routeData, routeSchema(false))

export const publicFields = [
	//
	'uid',
	'title',
	'updatedAt',
	`pins: includes_pin @facets(order) {
		uid
		title
	}`,
	`owner: ~owns_route {
		uid
		username
	}`,
].join('\n')
const singleFields = ['owner']
/**
 * Clean
 */

export const clean = <T: UpdateRouteData | NewRouteData>(routeData: T): Promise<T> =>
	promisePipe(
		// $FlowFixMe
		merge(defaultValues),
		filterNullAndUndefined,
	)(routeData)

/**
 * Parse
 */

const sortPins = (obj) => {
	const { pins } = obj
	const sortedPins = [...pins].sort((a, b) => (a['pins|order'] < b['pins|order'] ? -1 : 1))
	return {
		...obj,
		pins: sortedPins,
	}
}

const parse = pipe(
	// $FlowFixMe
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
