import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { Classroom } from '../../types-ts'

export const classroomsQuery = gql/* GraphQL */ `
	query ClassroomsQuery(
		$first: Int
		$after: String
		$sort: ClassroomSortParameter
		$where: ClassroomFilterParameter
	) {
		classrooms(
			input: { first: $first, after: $after, sort: $sort, where: $where }
		) {
			pageInfo {
				lastCursor
				hasNextPage
			}
			edges {
				node {
					uid
					title
					description
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

export interface ClassroomsQueryResponse {
	classrooms: Paginated<Classroom>
}
