import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { User } from '../../types-ts'

const query = gql`
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

export interface UsersQueryResponse {
	users: Paginated<User>
}
