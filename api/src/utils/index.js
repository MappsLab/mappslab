// @flow
import { pipeP, flatten, filter, assoc, prop } from 'ramda'
import type { NestedArray } from 'ramda'

export const filterNullAndUndefined = (obj: Object): Promise<Object> =>
	new Promise((resolve) =>
		resolve(filter((a) => a !== null && a !== undefined)(obj)),
	)

// Makes regular functions async for promisePipe
export const promisify = (f: Function): Function => async (...args) =>
	f(...args)

export const promisePipe = (...funcs: Array<Function>) =>
	pipeP(...funcs.map(promisify))

export const arrayify = (...things: NestedArray<mixed>): Array<mixed> =>
	flatten(things)

export const slugify = (text: string) =>
	text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')

export const createSlugFrom = (key: string) => (obj: Object) =>
	assoc('slug', slugify(prop(key, obj)))(obj)
