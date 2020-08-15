import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { Classroom, QueryClassroomsArgs } from '../../types-ts'

export const classroomsQuery = gql`
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

export type ClassroomsInput = QueryClassroomsArgs['input']

export interface ClassroomsResponse {
	classrooms: Paginated<Classroom>
}

// export const useClassroomsQuery = (
// 	options: QueryHookOptions<Classroomsresponse, ClassroomInput> = {},
// ) => useQuery<ClassroomsResponse, ClassroomInput>(classroomsQuery, options)
