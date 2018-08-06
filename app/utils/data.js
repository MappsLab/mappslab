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

export const minMax = (min: number, max: number) => (num: number): number => Math.min(Math.max(num, min), max)

// Push an item to an array within an object

export const pushPath = (path: Array<string>, item: any) => (target: Object) => {
	const arr = R.path(path)(target) || []
	return R.assocPath(path, [...arr, item])(target)
}
