/* global expect describe it */
import { makeFilterString } from 'Database/utils'

const assertFilters = (filters) =>
	filters.forEach(({ filter, expected }) => {
		const result = makeFilterString(filter)
		expect(result).toBe(expected)
	})

describe('[makeFilterString]', () => {
	it('should properly format string operators', async () => {
		const filters = [
			{
				filter: {
					title: {
						contains: 'word',
					},
				},
				expected: '@filter((regexp(title, /word/i)))',
			},
			{
				filter: {
					slug: {
						notEq: 'nothing',
					},
				},
				expected: '@filter((NOT eq(slug, "nothing")))',
			},
			{
				filter: {
					slug: {
						eq: 'something',
					},
				},
				expected: '@filter((eq(slug, "something")))',
			},
		]
		assertFilters(filters)
	})

	it('should properly format grouped operators', async () => {
		const filters = [
			// grouped filter
			{
				filter: {
					title: {
						contains: 'Fan',
						notEq: 'Fantastic Music',
					},
					studentCount: {
						gte: 12,
					},
				},
				expected: '@filter((regexp(title, /Fan/i) AND NOT eq(title, "Fantastic Music")) AND (ge(studentCount, 12)))',
			},
		]
		assertFilters(filters)
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */

		/* Assert */
		// expect(...)
	})

	it('should properly format number operators', async () => {
		const filters = [
			{
				filter: { a: { eq: 1 } },
				expected: '@filter((eq(a, 1)))',
			},
			{
				filter: { a: { notEq: 0 } },
				expected: `@filter((NOT eq(a, 0)))`,
			},
			{
				filter: { a: { gt: 1 } },
				expected: '@filter((gt(a, 1)))',
			},
			{
				filter: { a: { gte: 1 } },
				expected: '@filter((ge(a, 1)))',
			},
			{
				filter: { a: { lt: 1 } },
				expected: '@filter((lt(a, 1)))',
			},
			{
				filter: { a: { lte: 1 } },
				expected: '@filter((le(a, 1)))',
			},
			{
				filter: {
					studentCount: {
						between: {
							start: 5,
							end: 10,
						},
					},
				},
				expected: '@filter(((ge(studentCount, 5) AND le(studentCount, 5))))',
			},
		]
		assertFilters(filters)
	})

	it.skip('should properly format date operators', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it('should return an empty string when the filter is undefined or empty', async () => {
		const result = makeFilterString({})
		expect(result).toBe('')
		const result2 = makeFilterString()
		expect(result2).toBe('')
		const result3 = makeFilterString(null)
		expect(result3).toBe('')
	})
})
