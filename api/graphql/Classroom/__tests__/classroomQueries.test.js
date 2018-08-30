// @flow
/* eslint-disable no-undef */
import { artClass } from 'Database/stubs/classrooms'
import { request } from '../../../__tests__/utils'
import { getFirstClassrooms } from './utils'

let classrooms

beforeAll(async (done) => {
	classrooms = await getFirstClassrooms()
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
		const result = await request(query, { variables }).catch((e) => console.log(e))
		expect(result.data.classroom.title).toBe(artClass.title)
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
		const variables = { slug: artClass.slug }
		const result = await request(query, { variables })
		expect(result.data.classroom.title).toBe(artClass.title)
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
		const variables = { slug: artClass.slug }
		const result = await request(query, { variables })
		const { students, teachers, maps } = result.data.classroom
		expect(students.edges[0].node.name.length).toBeGreaterThan(0)
		expect(teachers.edges[0].node.name.length).toBeGreaterThan(0)
		expect(maps.edges[0].node.title.length).toBeGreaterThan(0)
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
		expect(uidResult.data.classrooms.edges.length).toBeGreaterThan(2)
	})
})
