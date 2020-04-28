import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/react-hooks'
import { User } from '../../types-ts'

export const usersQuery = gql`
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

export const useUsersQuery = (variables: UsersListOptions) => {}
