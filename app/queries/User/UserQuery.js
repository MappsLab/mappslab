// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query UserQuery($uid: String!) {
		user(input: { uid: $uid }) {
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
