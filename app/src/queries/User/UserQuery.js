// @flow
import gql from 'graphql-tag'
import type { UserType } from 'Types/User'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query UserQuery($uid: String, $email: String) {
		user(input: { uid: $uid, email: $email }) {
			uid
			name
			roles
			classrooms {
				edges {
					node {
						uid
						title
						slug
						description
					}
				}
			}
		}
	}
`

type UserResponse = {
	user: UserType,
}

const UserQuery: QueryWrapper<UserResponse> = withDefaultQuery(query)

export default UserQuery
