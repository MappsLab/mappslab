import { traceObject, eventsReducer } from '../utils/data'

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
