// @flow
import * as R from 'ramda'
import { arrayify } from 'Utils/data'

export type ValidatorFunction = (value: any, allValues: object) => any
// Chains a series of validators.
// Returns `undefined` if valid, or the message from the first failed validator.

/**
 * Utilities
 */

export const composeValidators = (...validators: Array<ValidatorFunction | Array<ValidatorFunction>>): ValidatorFunction => (
	value: string | void,
) =>
	arrayify(validators).reduce((error, validator) => {
		if (error) return error
		if (typeof validator === 'function') return validator(value)
		throw new Error('Validator must be a function')
	}, undefined)

/**
 * Basic validators
 */

export const required = (value: string | void) => (value ? undefined : 'Required')

export const minLength = (min: number) => (value: string = ''): string | void =>
	!value || value.length >= min ? undefined : `Must be at least ${min} characters`

export const maxLength = (max: number) => (value: string = '') =>
	!value || value.length <= max ? undefined : `Must be no more than ${max} characters`

export const minMaxLength = (min: number, max: number) => (value: string = '') =>
	!value || (value.length <= max && value.length >= min) ? undefined : `Must be between ${min} and ${max} characters long`

/**
 * Numeric validators
 */

export const mustBeNumber = (value: string | number | void) =>
	typeof value === 'number' || (value && !Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value)))
		? undefined
		: 'Must be a number'

export const minValue = (min: number) =>
	composeValidators(mustBeNumber, (value: number) => (value >= min ? undefined : `Should be at least ${min}`))

export const maxValue = (min: number) =>
	composeValidators(mustBeNumber, (value: number) => (value <= min ? undefined : `Should be no more than ${min}`))

export const minMaxValue = (min: number, max: number) =>
	composeValidators(mustBeNumber, (value: number) =>
		value >= min && value <= max ? undefined : `Should be between ${min} and ${max}`,
	)

/**
 * String validators
 */

const alphaNumDashRegex = /^[a-zA-Z0-9-]+$/
const noDoubleDashRegex = /^((?!--).)*$/
const noUpperCaseRegex = /^((?![A-Z]).)*$/
const startEndAlphaNumRegex = /^[a-z0-9].*[a-z0-9]$/

export const alphaNumDash = (value: string) =>
	!value || alphaNumDashRegex.test(value) ? undefined : 'May only be letters, numbers, and hyphens'
export const noUpperCase = (value: string) => (!value || noUpperCaseRegex.test(value) ? undefined : 'Must be all lower case')
export const noDoubleDash = (value: string) =>
	!value || noDoubleDashRegex.test(value) ? undefined : 'May not contain sequential hyphens'
export const startEndAlphaNum = (value: string) =>
	!value || startEndAlphaNumRegex.test(value) ? undefined : 'Must start and end with a letter or number'

// export const validUsername = composeValidators(startEndAlphaNum, noDoubleDash, noUpperCase, alphaNumDash, minMaxLength(5, 25))
export const validUsername = composeValidators(minMaxLength(5, 25), alphaNumDash, noUpperCase, noDoubleDash, startEndAlphaNum)

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const email = (value: string): string | void =>
	!value || emailRegex.test(value) ? undefined : 'Please enter a valid email address'

const urlRegex = /^((https?):\/\/[-\w]+(\.\w[-\w]*)+|(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?\.)+(?: com\b|edu\b|biz\b|gov\b|in(?:t|fo)\b|mil\b|net\b|org\b|[a-z][a-z]\b))(:\d+)?(\/[^.!,?;"'<>[\]{}\s\x7F-\xFF]*(?:[.!,?]+[^.!,?;"'<>()[\]{}\s\x7F-\xFF]+)*)?/
export const mustBeUrl = (value: string): string | void =>
	!value || urlRegex.test(value) ? undefined : 'Must be a valid URL. Be sure to include "http://"'

/**
 * Misc validators
 */

const arrayValuesMatch = (values: Array<string | number>): boolean => {
	if (values.length < 2) return true
	return R.uniq(values).length === 1
}

const valuesMustMatch = (fields: string[]) => (values): boolean =>
	// $FlowFixMe
	R.pipe(
		R.pickAll(fields),
		Object.values,
		arrayValuesMatch,
	)(values)

export const passwordsMustMatch = (values: { password: string; password2: string }) => {
	const match = valuesMustMatch(['password', 'password2'])(values)
	return match ? {} : { password2: 'Passwords must match' }
}

/**
 * Data validators (async)
 */

export const emailValidators = composeValidators(required, email, maxLength(128))
export const usernameValidators = composeValidators(required, maxLength(24), validUsername)
