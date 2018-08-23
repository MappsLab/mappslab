// @flow
import gql from 'graphql-tag'
import { unwindEdges } from 'Utils'
import withQuery from '../withQuery'

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
								role
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
			classrooms,
			request: {
				...rest,
			},
		}
	},
}

const withClassroomsQuery = withQuery(query, config)

export default withClassroomsQuery
