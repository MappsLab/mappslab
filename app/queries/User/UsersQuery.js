// @flow
import gql from 'graphql-tag'
import type { UserType } from 'Types/User'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

const query = gql/* GraphQL */ `
	query UsersQuery($first: Int, $after: String, $sort: UserSortParameter, $where: UserFilterParameter) {
		users(input: { first: $first, after: $after, sort: $sort, where: $where }) {
			pageInfo {
				hasNextPage
				hasPrevPage
				lastCursor
			}
			edges {
				node {
					uid
					name
				}
			}
		}
	}
`

type UsersResponse = {
	users: Array<UserType>,
}

const UsersQuery: QueryWrapper<UsersResponse> = withDefaultQuery(query)

export default UsersQuery
