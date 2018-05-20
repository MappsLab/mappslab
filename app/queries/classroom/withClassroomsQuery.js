// @flow
import gql from 'graphql-tag'
import * as R from 'ramda'
import { makeQuery, unwindEdges } from '../utils'

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
							}
						}
					}
				}
			}
		}
	}
`

const config = {
	props: ({ data }) => {
		const { loading, classrooms, ...rest } = unwindEdges(data)
		return {
			loading,
			classrooms: classrooms || [],
			request: {
				...rest,
			},
		}
	},
}

const withClassroomsQuery = makeQuery(query, config)

export default withClassroomsQuery
