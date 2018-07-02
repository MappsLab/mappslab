// @flow
import gql from 'graphql-tag'
import { unwindEdges } from '../utils'
import withQuery from '../withQuery'

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

const withClassroomsQuery = withQuery(query, config)

export default withClassroomsQuery
