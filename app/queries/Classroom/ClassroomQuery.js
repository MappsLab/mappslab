// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query ClassroomQuery($uid: String, $slug: String) {
		classroom(input: { uid: $uid, slug: $slug }) {
			title
			uid
			slug
			students {
				pageInfo {
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
	}
`

const ClassroomQuery = withDefaultQuery(query)

export default ClassroomQuery
