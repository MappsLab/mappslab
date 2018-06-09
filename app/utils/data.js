// @flow
import * as R from 'ramda'
import type { NestedArray } from 'ramda'

export const findNextInArray = (array: Array<mixed>, item: mixed): any | void => {
	if (!array.includes(item)) return null
	let nextI
	const currI = array.findIndex((k) => k === item)
	if (currI === array.length - 1) {
		nextI = 0
	} else nextI = currI + 1
	return array[nextI]
}

export const arrayify = (...things: NestedArray<mixed>): Array<mixed> => R.flatten(things)
