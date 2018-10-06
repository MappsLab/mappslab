import { makeFilterString } from 'Database/utils'

describe('[makeFilterString]', () => {
	it('should properly format string operators', async () => {
		const filter = {
			title: {
				contains: 'word',
			},
			slug: {
				eq: 'something',
			},
		}

		const result = makeFilterString(filter)
		expect(result).toMatch(/^@filter\(/)
		expect(result).toContain('regexp(title, /word/i)')
		expect(result).toContain('eq(slug, "something")')
	})

	it('should properly format number operators', async () => {
		const filter = {
			a: {
				eq: 1,
			},
			b: {
				lt: 2,
			},
			c: {
				gt: 3,
			},
			d: {
				lte: 4,
			},
			e: {
				gte: 5,
			},
			f: {
				between: { start: 0, end: 10 },
			},
		}
		const result = makeFilterString(filter)
		expect(result).toContain('eq(a, 1)')
		expect(result).toContain('lt(b, 2)')
		expect(result).toContain('gt(c, 3)')
		expect(result).toContain('le(d, 4)')
		expect(result).toContain('ge(e, 5)')
		expect(result).toContain('ge(f, 0) AND le(f, 10)')
	})

	it.skip('should properly format date operators', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it('should return an empty string when the filter is undefined or empty', async () => {
		/* Arrange */
		const result = makeFilterString({})
		expect(result).toBe('')
		const result2 = makeFilterString()
		expect(result2).toBe('')
		const result3 = makeFilterString(null)
		expect(result3).toBe('')
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
