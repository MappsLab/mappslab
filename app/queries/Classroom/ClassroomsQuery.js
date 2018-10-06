// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query ClassroomsQuery($first: Int, $after: String, $sort: ClassroomSortParameter, $filter: ClassroomFilterParameter) {
		classrooms(input: { first: $first, after: $after, sort: $sort, filter: $filter }) {
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

const ClassroomsQuery = withDefaultQuery(query)

export default ClassroomsQuery
