// @flow
import gql from 'graphql-tag'
import type { ClassroomType } from 'Types/Classroom'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query ClassroomsQuery($first: Int, $after: String, $sort: ClassroomSortParameter, $where: ClassroomFilterParameter) {
		classrooms(input: { first: $first, after: $after, sort: $sort, where: $where }) {
			pageInfo {
				lastCursor
				hasNextPage
			}
			edges {
				node {
					uid
					title
					slug
					teachers {
						edges {
							node {
								name
								uid
								roles
							}
						}
					}
				}
			}
		}
	}
`

type ClassroomsResponse = {
	classrooms: Array<ClassroomType>,
}

const ClassroomsQuery: QueryWrapper<ClassroomsResponse> = withDefaultQuery(query)

export default ClassroomsQuery
