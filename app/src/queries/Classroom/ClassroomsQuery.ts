import gql from 'graphql-tag'
import { useQuery, QueryHookOptions } from '@apollo/client'
import { Paginated } from '@good-idea/unwind-edges'
import { Classroom, QueryClassroomsArgs } from '../../types-ts'

const classroomsQuery = gql`
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

type Variables = QueryClassroomsArgs['input']

interface Response {
	classrooms: Paginated<Classroom>
}

export const useClassroomsQuery = (
	options: QueryHookOptions<Response, Variables> = {},
) => useQuery<Response, Variables>(classroomsQuery, options)

