/* eslint-disable no-undef */

import {
	required,
	minLength,
	maxLength,
	minMaxLength,
	mustBeNumber,
	minValue,
	maxValue,
	minMaxValue,
	email,
	alphaNumDash,
	noUpperCase,
	noDoubleDash,
	startEndAlphaNum,
	validUsername,
	mustBeUrl,
} from '../components/Forms/validators'

describe('Validator: required', () => {
	it('Validates required fields', () => {
		expect(required('')).toBe('Required')
		expect(required(undefined)).toBe('Required')
		expect(required('value')).toBe(undefined)
	})
})

describe('Validator: minLength', () => {
	it('Validates minimum length of strings', () => {
		expect(minLength(5)('a')).toBe('Must be at least 5 characters')
		expect(minLength(5)('abcde')).toBe(undefined)
		expect(minLength(5)('abcdef')).toBe(undefined)
	})
})

describe('Validator: maxLength', () => {
	it('Validates maximum length of strings', () => {
		expect(maxLength(5)('abcdef')).toBe('Must be no more than 5 characters')
		expect(maxLength(5)('abcde')).toBe(undefined)
		expect(maxLength(5)('')).toBe(undefined)
	})
})

describe('Validator: minMaxLength', () => {
	it('Validates minimum length of strings', () => {
		expect(minMaxLength(5, 10)('a')).toBe('Must be between 5 and 10 characters long')
		expect(minMaxLength(5, 10)('abcde')).toBe(undefined)
		expect(minMaxLength(5, 10)('abcdefgh')).toBe(undefined)
		expect(minMaxLength(5, 10)('abcdefghij')).toBe(undefined)
		expect(minMaxLength(5, 10)('abcefghhijk')).toBe('Must be between 5 and 10 characters long')
	})
})

describe('Validator: mustBeNumber', () => {
	it('Validates inputs as numbers', () => {
		expect(mustBeNumber('foo')).toBe('Must be a number')
		expect(mustBeNumber(undefined)).toBe('Must be a number')
		// expect(mustBeNumber([1])).toBe('Must be a number')
		expect(mustBeNumber(1)).toBe(undefined)
	})
})

describe('Validator: minValue', () => {
	it('Validates a minimum value', () => {
		expect(minValue(2)('foo')).toBe('Must be a number')
		expect(minValue(2)(1)).toBe('Should be at least 2')
		expect(minValue(2)(2)).toBe(undefined)
		expect(minValue(2)(3)).toBe(undefined)
	})
})

describe('Validator: maxValue', () => {
	it('Validates a maximum value', () => {
		expect(maxValue(2)('foo')).toBe('Must be a number')
		expect(maxValue(2)(3)).toBe('Should be no more than 2')
		expect(maxValue(2)(2)).toBe(undefined)
		expect(maxValue(2)(1)).toBe(undefined)
	})
})

describe('Validator: minMmaxValue', () => {
	it('Validates a maximum value', () => {
		expect(minMaxValue(10, 20)('foo')).toBe('Must be a number')
		expect(minMaxValue(10, 20)(5)).toBe('Should be between 10 and 20')
		expect(minMaxValue(10, 20)(25)).toBe('Should be between 10 and 20')
		expect(minMaxValue(10, 20)(10)).toBe(undefined)
		expect(minMaxValue(10, 20)(15)).toBe(undefined)
		expect(minMaxValue(10, 20)(20)).toBe(undefined)
	})
})

describe('Validator: URL', () => {
	it('Validates urls', () => {
		expect(mustBeUrl('foo')).toBe('Must be a valid URL. Be sure to include "http://"')
		expect(mustBeUrl('http://userid@example.com')).toBe('Must be a valid URL. Be sure to include "http://"')
		expect(mustBeUrl('http://userid:password@example.com/')).toBe('Must be a valid URL. Be sure to include "http://"')
		expect(mustBeUrl('http://1337.net')).toBe(undefined)
		expect(mustBeUrl('https://1337.net')).toBe(undefined)
		expect(mustBeUrl('http://foo.com/blah_blah_(wikipedia)_(again)')).toBe(undefined)
		expect(mustBeUrl('https://www.example.com/foo/?bar=baz&inga=42&quux')).toBe(undefined)
		expect(mustBeUrl('')).toBe(undefined)
	})
})

describe('Validator: email', () => {
	it('Validates email addresses', () => {
		expect(email('foo')).toBe('Please enter a valid email address')
		expect(email('foo@bar')).toBe('Please enter a valid email address')
		expect(email(' foo@bar.com')).toBe('Please enter a valid email address')
		expect(email('foo@bar.xyz')).toBe(undefined)
		expect(email('')).toBe(undefined)
	})
})

// alphaNumDash,
// noDoubleDash,
// startEndAlphaNum,
// vaidUsername,

describe('Validator: alphaNumDash', () => {
	it('Must be letters, numbers, or hyphens', () => {
		expect(alphaNumDash('With Spaces')).toBe('May only be letters, numbers, and hyphens')
		expect(alphaNumDash('withCh@rs')).toBe('May only be letters, numbers, and hyphens')
		expect(alphaNumDash('abcXYZ123')).toBe(undefined)
		expect(alphaNumDash('')).toBe(undefined)
	})
})

describe('Validator: noUpperCase', () => {
	it('Must be lower case', () => {
		expect(noUpperCase('A string')).toBe('Must be all lower case')
		expect(noUpperCase('a string')).toBe(undefined)
		expect(noUpperCase('')).toBe(undefined)
	})
})

describe('Validator: noDoubleDash', () => {
	it('Must be lower case', () => {
		expect(noDoubleDash('a--b')).toBe('May not contain sequential hyphens')
		expect(noDoubleDash('a-b')).toBe(undefined)
		expect(noDoubleDash('')).toBe(undefined)
	})
})

describe('Validator: startEndAlphaNum', () => {
	it('Must start and end with a letter or number', () => {
		expect(startEndAlphaNum('@abc')).toBe('Must start and end with a letter or number')
		expect(startEndAlphaNum('abc@')).toBe('Must start and end with a letter or number')
		expect(startEndAlphaNum(' abc')).toBe('Must start and end with a letter or number')
		expect(startEndAlphaNum('abc ')).toBe('Must start and end with a letter or number')
		expect(startEndAlphaNum('abc')).toBe(undefined)
		expect(startEndAlphaNum('')).toBe(undefined)
	})
})

describe('Validator: validUsername', () => {
	it('Must validate with all composed validators', () => {
		expect(validUsername('jose')).toBe('Must be between 5 and 25 characters long')
		expect(validUsername('IsabellaFiorellaElettraGiovannaRossellini')).toBe('Must be between 5 and 25 characters long')
		expect(validUsername('joseph#1')).toBe('May only be letters, numbers, and hyphens')
		expect(validUsername('Joseph')).toBe('Must be all lower case')
		expect(validUsername('joseph--thomas')).toBe('May not contain sequential hyphens')
		expect(validUsername('-joseph')).toBe('Must start and end with a letter or number')
		expect(validUsername('joseph')).toBe(undefined)
		expect(validUsername('joseph-thomas')).toBe(undefined)
		expect(validUsername('joseph-thomas-1')).toBe(undefined)
	})
})
