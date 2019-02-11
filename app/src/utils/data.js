// @flow
import * as R from 'ramda'
import type { NestedArray } from 'ramda'

export const findLastIndex = <T>(array: Array<T>, fn: (T) => boolean): number => {
	const reverseIndex = [...array].reverse().findIndex(fn)
	return array.length - reverseIndex - 1
}

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

export const compose = (...funcs: Array<Function>) => funcs.reduce((a, b) => (...args: any) => a(b(...args)), (arg) => arg)

/** Statechart Helpers */

/**
 * Turn a statechart value object into a string:
 * { foo: { bar: 'baz' } } => 'foo.bar.baz'
 */

type MachineValue = {
	[key: string]: string | MachineValue,
}
export const getStateString = (value: MachineValue): string =>
	typeof value === 'string'
		? value
		: Object.entries(value)
				// $FlowFixMe
				.reduce((acc, [key, val]: [string, MachineValue]) => [...acc, key, getStateString(val)], [])
				.join('.')

export const traceObject = (object: any, path: MachineValue | string = '', searchKey: string) => {
	const [prop, nextPath] = getStateString(path).split(/\.(.*)/)
	const value = searchKey in object ? object[searchKey] : undefined
	const nextLevel = prop in object ? traceObject(object[prop], nextPath, searchKey) : []
	return [value, ...nextLevel].filter(Boolean)
}

export const isFunc = (fn: any): boolean => Boolean(fn instanceof Function)

const fnReducer = (fns: Array<Function>) => (val = {}) =>
	fns.reduce(
		(acc, fn) => {
			if (fn.then && isFunc(fn.then)) throw new Error('Actions must not be promises')
			return {
				...acc,
				/* Apply each function to the accumulated value,
				merging over the accumulator */
				...fn(acc),
			}
		},
		/* starting with an initial value */
		val,
	)

// export const eventsRe

export const eventsReducer = R.pipe(
	traceObject,
	fnReducer,
)
