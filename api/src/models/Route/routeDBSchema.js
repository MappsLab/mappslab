// @flow
import Joi from 'joi'
import { pipe, head, assoc, dissoc, merge, when, propEq, map } from 'ramda'
import type { NewRouteData, UpdateRouteData, RouteType } from 'Types/RouteTypes'
import { promisePipe, filterNullAndUndefined } from 'Utils'
import { parseSingularFields } from 'Utils/parsing'

/**
 * Schema
 */

export const routeSchema = (isNew: boolean = true) =>
	Joi.object().keys({
		title: isNew
			? Joi.string()
					.min(3)
					.max(35)
					.required()
					.default('Untitled Route')
			: Joi.string()
					.min(3)
					.max(35),
		createdAt: isNew
			? Joi.date().default(new Date())
			: // .required()
			  Joi.any().forbidden(),
		updatedAt: Joi.date().required(),
		deleted: isNew ? Joi.boolean().default(false) : Joi.boolean(),
		type: Joi.any().only('route'),
	})

export const defaultValues = {
	type: 'route',
	updatedAt: new Date(),
}

export const validateNew = (routeData: NewRouteData) => Joi.validate(routeData, routeSchema(true))
export const validateUpdate = (routeData: UpdateRouteData) => Joi.validate(routeData, routeSchema(false))

export const publicFields = ['uid', 'title', 'updatedAt'].join('\n')
// const singleFields = ['owner']
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

const parse = pipe(
	// $FlowFixMe
	// parseSingularFields(singleFields),
	// when(propEq('description', undefined), assoc('description', '')),
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
