/* eslint-disable no-undef */
// import React from 'react'
// import { render } from 'react-testing-library'
// import { _getOptionsForState } from '../Maps/mapOptions'
import { createObjectSearchByState } from 'Utils/statecharts'

const chart = {
	One: {
		options: { a: false, b: false },
	},
	Two: {
		options: { a: false, b: false },
		TwoA: {
			options: { b: true },
		},
		TwoB: {
			options: { a: true, b: false },
			TwoBOne: {
				options: { b: true, c: true, d: 'wtf' },
			},
		},
	},
}

// const getOptions = _getOptionsForState(options)
const getOptions = createObjectSearchByState({
	chart,
	searchKey: 'options',
	defaults: {
		a: true,
		something: 'nothing',
	},
})

describe('[getOptionsForState]', () => {
	it('should fetch first-level options', () => {
		const state = 'One'
		const result = getOptions(state)
		expect(result.a).toBe(false)
		expect(result.b).toBe(false)
		expect(result.c).toBe(undefined)
	})

	it('should fetch second-level options', () => {
		const state = {
			Two: 'TwoA',
		}
		const result = getOptions(state)
		expect(result.a).toBe(false)
		expect(result.b).toBe(true)
		expect(result.c).toBe(undefined)
	})

	it('should fetch third+ level options', () => {
		const state = {
			Two: {
				TwoB: 'TwoBOne',
			},
		}
		const result = getOptions(state)
		expect(result.a).toBe(true)
		expect(result.b).toBe(true)
		expect(result.c).toBe(true)
	})

	it('should fall back to default options', async () => {
		const state = 'One'
		const result = getOptions(state)
		expect(result.something).toBe('nothing')
		expect(result.a).toBe(false)
		expect(result.b).toBe(false)
		expect(result.c).toBe(undefined)
	})

	it('should not break on missing options', () => {
		const state = {
			Two: {
				TwoB: 'TwoBTwo',
			},
		}
		const result = getOptions(state)
		expect(result.a).toBe(true)
		expect(result.b).toBe(false)
		expect(result.c).toBe(undefined)
	})
})
