import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/client'
import { User, QueryUsersArgs } from '../../types-ts'

const usersQuery = gql`
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

type Variables = QueryUsersArgs['input']

interface UsersQueryResponse {
	users: Paginated<User>
}

export const useUsersQuery = (variables?: Variables) =>
	useQuery<UsersQueryResponse, Variables>(usersQuery, { variables })
