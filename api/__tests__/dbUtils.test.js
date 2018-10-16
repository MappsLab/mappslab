import { makeFilterString, makePaginationString } from 'Database/utils'

describe('[makePaginationString]', () => {
	it('should return a "first" that is +1 from the supplied "first"', async () => {
		const result = makePaginationString(10)
		expect(result).toBe(', first: 11')
	})
})

describe('[makeFilterString]', () => {
	const assertFilters = (filters) =>
		filters.forEach(({ where, expected }) => {
			const result = makeFilterString(where)
			expect(result).toBe(expected)
		})

	it('should properly format string operators', async () => {
		const filters = [
			{
				where: {
					title: {
						contains: 'word',
					},
				},
				expected: '@filter((regexp(title, /word/i)))',
			},
			{
				where: {
					slug: {
						notEq: 'nothing',
					},
				},
				expected: '@filter((NOT eq(slug, "nothing")))',
			},
			{
				where: {
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
				where: {
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
				where: { a: { eq: 1 } },
				expected: '@filter((eq(a, 1)))',
			},
			{
				where: { a: { notEq: 0 } },
				expected: `@filter((NOT eq(a, 0)))`,
			},
			{
				where: { a: { gt: 1 } },
				expected: '@filter((gt(a, 1)))',
			},
			{
				where: { a: { gte: 1 } },
				expected: '@filter((ge(a, 1)))',
			},
			{
				where: { a: { lt: 1 } },
				expected: '@filter((lt(a, 1)))',
			},
			{
				where: { a: { lte: 1 } },
				expected: '@filter((le(a, 1)))',
			},
			{
				where: {
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

	it('should properly format relationship filters', async () => {
		/* Arrange */
		const filters = [
			// users
			{
				where: { userTeachesIn: { eq: '0x123' } },
				expected: '@filter((uid_in(teaches_in, 0x123)))',
			},
			{
				where: { userLearnsIn: { eq: '0x123' } },
				expected: '@filter((uid_in(learns_in, 0x123)))',
			},

			// classrooms
			{
				where: { classroomHasStudent: { eq: '0x123' } },
				expected: '@filter((uid_in(~learns_in, 0x123)))',
			},
			{
				where: { classroomHasTeacher: { eq: '0x123' } },
				expected: '@filter((uid_in(~teaches_in, 0x123)))',
			},

			// pins

			{
				where: { pinnedByUser: { eq: '0x123' } },
				expected: '@filter((uid_in(~pinned, 0x123)))',
			},
			{
				where: { pinnedInMap: { eq: '0x123' } },
				expected: '@filter((uid_in(~has_pin, 0x123)))',
			},
		]
		assertFilters(filters)
	})

	it('should return an error when a relationship filter is used without "eq" or "notEq"', async () => {
		const makeString = () => makeFilterString({ userTeachesIn: { contains: '0x123' } })
		expect(makeString).toThrow('"contains" is an invalid operator. Relationship operator may only be "eq" or "notEq"')
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
