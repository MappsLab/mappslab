import { request } from './utils/db'
import { getDBClassrooms } from './utils/classroom'

let classrooms

beforeAll(async (done) => {
	classrooms = await getDBClassrooms()
	done()
})

describe('queries', () => {
	it('[classroom] should fetch a classrom by uid', async () => {
		const query = /* GraphQL */ `
			query Classroom($uid: String) {
				classroom(input: { uid: $uid }) {
					uid
					title
				}
			}
		`
		const variables = { uid: classrooms[0].uid }
		const result = await request(query, { variables })

		expect(result.data.classroom.title.length).toBeGreaterThan(0)
	})

	it('[classroom] should fetch a classrom by slug', async () => {
		const query = /* GraphQL */ `
			query Classroom($slug: String) {
				classroom(input: { slug: $slug }) {
					uid
					title
				}
			}
		`
		const variables = { slug: classrooms[0].slug }
		const result = await request(query, { variables })
		expect(result.data.classroom.title).toBe(classrooms[0].title)
	})

	it('[classroom] should fetch its connections', async () => {
		const query = /* GraphQL */ `
			query Classroom($slug: String) {
				classroom(input: { slug: $slug }) {
					uid
					title
					students {
						edges {
							node {
								name
							}
						}
					}
					teachers {
						edges {
							node {
								name
							}
						}
					}
					maps {
						edges {
							node {
								title
							}
						}
					}
				}
			}
		`
		const variables = { slug: classrooms[0].slug }
		const result = await request(query, { variables })
		const { students, teachers, maps } = result.data.classroom
		expect(students.edges[0].node.name.length).toBeGreaterThan(0)
		expect(teachers.edges[0].node.name.length).toBeGreaterThan(0)
		expect(maps.edges[0].node.title.length).toBeGreaterThan(0)
	})

	it('[classroom] should return `viewerIsTeacher: true` if the current viewer teaches in the classroom', async () => {
		const initialQuery = /* GraphQL */ `
			query Classroom($slug: String) {
				classroom(input: { slug: $slug }) {
					uid
					viewerIsTeacher
					teachers {
						edges {
							node {
								uid
								roles
								name
							}
						}
					}
				}
			}
		`
		const variables = { slug: classrooms[0].slug }

		const initialResult = await request(initialQuery, { variables })
		const teacher = initialResult.data.classroom.teachers.edges[0].node
		expect(initialResult.data.classroom.viewerIsTeacher).toBe(false)
		const testQuery = /* GraphQL */ `
			query Classroom($slug: String) {
				classroom(input: { slug: $slug }) {
					uid
					viewerIsTeacher
					teachers {
						edges {
							node {
								uid
								roles
							}
						}
					}
				}
			}
		`
		const context = { viewer: teacher }
		const testResult = await request(testQuery, { variables, context })
		expect(testResult.data.classroom.viewerIsTeacher).toBe(true)
	})

	it('[classrooms] should fetch a list of classrooms', async () => {
		const uidQuery = /* GraphQL */ `
			{
				classrooms {
					edges {
						node {
							uid
						}
					}
					pageInfo {
						lastCursor
					}
				}
			}
		`
		const uidResult = await request(uidQuery)
		expect(uidResult.data.classrooms.edges.length).toBeGreaterThan(0)
	})

	it.skip('[classrooms] should properly filter classrooms with general operators', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
