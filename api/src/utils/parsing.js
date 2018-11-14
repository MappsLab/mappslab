// @flow
import { mapObjIndexed, head } from 'ramda'

const debug = require('debug')('api')

export const parseSingularFields = (singularFields: Array<string>) =>
	mapObjIndexed((value, key) => {
		if (singularFields.includes(key) && Array.isArray(value)) {
			if (!Array.isArray(value)) {
				debug(`Field '${key}' is not an array`)
				return value
			}
			if (value.length > 1)
				debug(`Field '${key}' has multiple entries but should be one. Your database might have unused entries.`)
			return head(value)
		}
		return value
	})
