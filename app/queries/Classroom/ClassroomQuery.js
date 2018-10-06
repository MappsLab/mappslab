// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query ClassroomQuery($uid: String, $slug: String) {
		classroom(input: { uid: $uid, slug: $slug }) {
			title
			description
			uid
			slug
			teachers {
				edges {
					node {
						uid
						name
						roles
					}
				}
			}
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
			maps {
				edges {
					node {
						uid
						title
					}
				}
			}
		}
	}
`

const ClassroomQuery = withDefaultQuery(query)

export default ClassroomQuery
