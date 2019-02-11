// @flow
import gql from 'graphql-tag'
import type { UserType } from 'Types/User'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

const query = gql/* GraphQL */ `
	query UsersQuery($input: UsersListOptions) {
		users(input: $input) {
			pageInfo {
				hasNextPage
				hasPrevPage
				lastCursor
			}
			edges {
				node {
					uid
					name
					roles
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
