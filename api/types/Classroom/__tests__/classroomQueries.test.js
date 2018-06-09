// @flow
/* eslint-disable no-undef */
import * as R from 'ramda'
import { request } from '../../../__tests__/utils'
import { artClass } from '../../../database/stubs/classrooms'

describe('queries', () => {
	it('[classroom] should fetch a classrom', async () => {
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
			}
		}
	`
		const variables = { slug: artClass.slug }
		const result = await request(query, { variables })
		const { students, teachers } = result.data.classroom
		expect(students.edges.length).toBeGreaterThan(3)
		expect(teachers.edges.length).toBeGreaterThan(0)
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
