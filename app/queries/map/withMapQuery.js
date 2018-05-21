// @flow
import gql from 'graphql-tag'
import { makeQuery, unwindEdges } from '../utils'

export const query = gql/* GraphQL */ `
	query MapQuery($uid: String, $slug: String) {
		map(input: { uid: $uid, slug: $slug }) {
			title
			uid
			slug
		}
	}
`

const config = {
	options: ({ slug, uid }) => (uid ? { variables: { uid } } : { variables: { slug } }),
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

const withClassroomsQuery = makeQuery(query, config)

export default withClassroomsQuery
