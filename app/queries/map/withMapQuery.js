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
		}
	}
`

const config = {
	options: ({ uid }) => ({ variables: { uid } }),
	props: ({ data }) => {
		const { loading, map, ...rest } = unwindEdges(data)
		console.log('!')
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
