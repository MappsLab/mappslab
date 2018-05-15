// @flow
import * as R from 'ramda'

export const filterNullAndUndefined = (obj: Object): Promise<Object> =>
	new Promise((resolve) => resolve(R.filter((a) => a !== null && a !== undefined)(obj)))

// Makes regular functions async for promisePipe
export const promisify = (f: Function): Function => async (...args) => f(...args)

export const promisePipe = (...funcs: Array<Function>) => R.pipeP(...funcs.map(promisify))
