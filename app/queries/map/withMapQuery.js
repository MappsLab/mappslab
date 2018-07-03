// @flow
import gql from 'graphql-tag'
import { unwindEdges } from '../utils'
import withQuery from '../withQuery'

export const query = gql/* GraphQL */ `
	query MapQuery($uid: String!) {
		map(input: { uid: $uid }) {
			title
			uid
			slug
			pins {
				pageInfo {
					lastCursor
					hasNextPage
				}
				edges {
					node {
						uid
						title
						lat
						lang
					}
				}
			}
		}
	}
`

const config = {
	options: ({ uid }) => ({ variables: { uid } }),
	props: ({ data }) => {
		const { loading, map, ...rest } = unwindEdges(data)
		return {
			loading,
			map,
			request: {
				...rest,
			},
		}
	},
}

const withClassroomsQuery = withQuery(query, config)

export default withClassroomsQuery
