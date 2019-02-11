// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

const query = gql/* GraphQL */ `
	query UsersQuery($first: Int, $after: String, $sort: UserSortParameter, $where: UserFilterParameter) {
		maps(input: { first: $first, after: $after, sort: $sort, where: $where }) {
			pageInfo {
				hasNextPage
				hasPrevPage
				lastCursor
			}
			edges {
				node {
					uid
					title
				}
			}
		}
	}
`

type UsersResponse = {
	users: Array<MapType>,
}

const UsersQuery: QueryWrapper<UsersResponse> = withDefaultQuery(query)

export default UsersQuery
