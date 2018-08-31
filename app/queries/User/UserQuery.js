// @flow
import gql from 'graphql-tag'
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
					}
				}
			}
		}
	}
`

const UserQuery = withDefaultQuery(query)

export default UserQuery
