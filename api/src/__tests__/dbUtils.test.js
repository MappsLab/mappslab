import { createQueryStrings, serializeFacets } from 'Database/utils'

// describe('[makePaginationString]', () => {
// 	it('should return a "first" that is +1 from the supplied "first"', async () => {
// 		const result = makePaginationString(10)
// 		expect(result).toBe(', first: 11')
// 	})
// })

const stripNsandTs = (str) => str.replace(/\n|\t|/g, ' ').replace(/\s+/g, ' ')

describe.only('[serializeFacets]', () => {
	it('should properly format dates', () => {
		const facets = { date: new Date('2000') }
		const serialized = serializeFacets(facets)
		expect(serialized).toBe('(date=2000-01-01T00:00:00.000Z)')
	})

	it('should properly format booleans', () => {
		const facets = { happy: true }
		const serialized = serializeFacets(facets)
		expect(serialized).toBe('(happy=true)')
	})

	it('should properly format integers', () => {
		const facets = { age: 33 }
		const serialized = serializeFacets(facets)
		expect(serialized).toBe('(age=33)')
	})

	it('should properly format floats', () => {
		const facets = { gpa: 3.5 }
		const serialized = serializeFacets(facets)
		expect(serialized).toBe('(gpa=3.5)')
	})

	it('should properly format strings', () => {
		const facets = { name: 'joseph' }
		const serialized = serializeFacets(facets)
		expect(serialized).toBe('(name=joseph)')
	})

	it('should properly format multiple facets', () => {
		const facets = { name: 'joseph', age: 33, gpa: 3.5 }
		const serialized = serializeFacets(facets)
		expect(serialized).toBe('(name=joseph, age=33, gpa=3.5)')
	})

	it('should return an empty string if no values are provided', () => {
		const facets = {}
		const serialized = serializeFacets(facets)
		expect(serialized).toBe('')
	})

	it('should throw an error if unsupported data types are used', async () => {
		const facets = { dogs: ['frank', 'ursa'] }
		const serialize = () => serializeFacets(facets)
		expect(serialize).toThrow('Facet value must be a string, boolean, number, or Date')
	})
})

describe('[makeFilterString]', () => {
	const assertFilters = (filters) =>
		filters.forEach(({ where, expected }) => {
			const result = createQueryStrings({ where })
			if (expected.filterString) expect(result.filterString).toBe(expected.filterString)
			if (expected.varBlocks) expect(stripNsandTs(result.varBlocks)).toBe(stripNsandTs(expected.varBlocks))
		})

	it('should properly format string operators', async () => {
		const filters = [
			{
				where: {
					title: {
						contains: 'word',
					},
				},
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (regexp(title, /word/i)))',
				},
			},
			{
				where: {
					slug: {
						notEq: 'nothing',
					},
				},
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (NOT eq(slug, "nothing")))',
				},
			},
			{
				where: {
					slug: {
						eq: 'something',
					},
				},
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (eq(slug, "something")))',
				},
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
				expected: {
					filterString:
						'@filter((eq(deleted, false)) AND (regexp(title, /Fan/i) AND NOT eq(title, "Fantastic Music")) AND (ge(studentCount, 12)))',
				},
			},
		]

		assertFilters(filters)
	})

	it('should properly format number operators', async () => {
		const filters = [
			{
				where: { a: { eq: 1 } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (eq(a, 1)))',
				},
			},
			{
				where: { a: { notEq: 0 } },
				expected: {
					filterString: `@filter((eq(deleted, false)) AND (NOT eq(a, 0)))`,
				},
			},
			{
				where: { a: { gt: 1 } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (gt(a, 1)))',
				},
			},
			{
				where: { a: { gte: 1 } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (ge(a, 1)))',
				},
			},
			{
				where: { a: { lt: 1 } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (lt(a, 1)))',
				},
			},
			{
				where: { a: { lte: 1 } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (le(a, 1)))',
				},
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
				expected: {
					filterString: '@filter((eq(deleted, false)) AND ((ge(studentCount, 5) AND le(studentCount, 5))))',
				},
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
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (uid_in(teaches_in, 0x123)))',
				},
			},
			{
				where: { userLearnsIn: { eq: '0x123' } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (uid_in(learns_in, 0x123)))',
				},
			},

			// classrooms
			{
				where: { classroomHasStudent: { eq: '0x123' } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (uid_in(~learns_in, 0x123)))',
				},
			},
			{
				where: { classroomHasTeacher: { eq: '0x123' } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (uid_in(~teaches_in, 0x123)))',
				},
			},

			// pins
			{
				where: { pinnedByUser: { eq: '0x123' } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (uid_in(~pinned, 0x123)))',
				},
			},
			{
				where: { pinnedInMap: { eq: '0x123' } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (uid_in(~has_pin, 0x123)))',
				},
			},

			// routes
			{
				where: { routeWithinMap: { eq: '0x123' } },
				expected: {
					filterString: '@filter((eq(deleted, false)) AND (uid(MAP_PINS)))',
					varBlocks: `
						var(func: uid(0x123)) {
							has_pin {
								MAP_PINS as ~includes_pin
							}
						}`,
				},
			},
		]
		assertFilters(filters)
	})

	it('should return an error when a relationship filter is used without "eq" or "notEq"', async () => {
		const makeString = () => createQueryStrings({ where: { userTeachesIn: { contains: '0x123' } } })
		expect(makeString).toThrow('"contains" is an invalid operator. Relationship operator may only be "eq" or "notEq"')
	})

	it('should return an empty string when the filter is undefined or empty', async () => {
		const result = createQueryStrings({})
		expect(result.filterString).toBe('@filter((eq(deleted, false)))')
		const result2 = createQueryStrings()
		expect(result2.filterString).toBe('@filter((eq(deleted, false)))')
		const result3 = createQueryStrings(null)
		expect(result3.filterString).toBe('@filter((eq(deleted, false)))')
	})
})
