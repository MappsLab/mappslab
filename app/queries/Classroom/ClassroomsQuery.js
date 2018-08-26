// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	{
		classrooms {
			pageInfo {
				lastCursor
				hasNextPage
			}
			edges {
				node {
					uid
					title
					slug
					teachers {
						edges {
							node {
								name
								uid
								roles
							}
						}
					}
				}
			}
		}
	}
`

const ClassroomsQuery = withDefaultQuery(query)

export default ClassroomsQuery
