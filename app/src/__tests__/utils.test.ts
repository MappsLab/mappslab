import { traceObject, eventsReducer } from '../utils/data'
import { getBestSize } from '../utils/media'
import { Image } from '../types-ts'

describe('[traceObject]', () => {
	it('should return an array of found values', async () => {
		const obj = {
			value: 'zero',
			a: {
				value: 'one',
				b1: {},
				b2: {
					c1: {
						value: 'two',
						d1: {},
						d2: {
							value: 'three',
						},
					},
				},
			},
		}
		const result = traceObject(obj, 'a.b2.c1.d2', 'value')
		expect(result).toEqual(['zero', 'one', 'two', 'three'])
	})
})

describe('[eventsReducer]', () => {
	it('should reduce through all functions', async () => {
		const obj = {
			first: {
				fn: () => ({
					first: 'should',
					second: 'BE',
				}),
				second: {
					fn: ({ second }) => ({
						second: second.toLowerCase(),
					}),
					third: {
						fn: () => ({
							third: 'lowercase',
						}),
					},
				},
			},
		}
		const result = eventsReducer(obj, 'first.second.third', 'fn')({})

		expect(result).toEqual({ first: 'should', second: 'be', third: 'lowercase' })
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */

		/* Assert */
		// expect(...)
	})

	it('should apply each of the found functions', async () => {
		const mockProps = {
			transition: jest.fn(),
		}
		const obj = {
			first: {
				onMouseOver: ({ payload, props, state }) => {
					props.transition('mousedOverFirst')
					return {
						payload,
						props,
						state: {
							...state,
							first: true,
						},
					}
				},
				second: {
					onMouseOver: ({ payload, props, state }) => ({
						payload,
						props,
						state: {
							...state,
							second: true,
						},
					}),
					third: {
						onMouseOver: ({ payload, props, state }) => {
							props.transition('mousedOverThird')
							return {
								payload,
								props,
								state: {
									...state,
									third: true,
									second: null,
								},
							}
						},
					},
				},
			},
		}
		const initial = { props: mockProps, state: { zero: true } }
		const result = eventsReducer(obj, 'first.second.third', 'onMouseOver')(initial)
		expect(result.props.transition.mock.calls.length).toBe(2)
		expect(result.props.transition.mock.calls[0][0]).toBe('mousedOverFirst')
		expect(result.props.transition.mock.calls[1][0]).toBe('mousedOverThird')
		expect(result.state).toEqual({
			zero: true,
			first: true,
			second: null,
			third: true,
		})
	})
})

describe('[getBestSize]', () => {
	const image: Image = {
		uid: '0x123',
		original: {
			uri: '/abc',
			format: 'png',
			height: 100,
			width: 1099,
		},
		sizes: [
			{ format: 'png', uri: '/xyz', height: 200, width: 100 },
			{ format: 'png', uri: '/xyz', height: 200, width: 600 },
			{ format: 'png', uri: '/xyz', height: 200, width: 1200 },
		],
	}

	it('should return the next-greatest image size', () => {
		expect(getBestSize(image, 50).width).toBe(100)
		expect(getBestSize(image, 100).width).toBe(100)
		expect(getBestSize(image, 101).width).toBe(600)
		expect(getBestSize(image, 800).width).toBe(1099)
		expect(getBestSize(image, 1100).width).toBe(1200)
	})

	it('should fall back to the largest size', () => {
		expect(getBestSize(image, 1900).width).toBe(1200)
	})
})
