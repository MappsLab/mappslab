// @flow
import gql from 'graphql-tag'
import { makeQuery, unwindEdges } from '../utils'

export const query = gql/* GraphQL */ `
	query ClassroomQuery($uid: String, $slug: String) {
		classroom(input: { uid: $uid, slug: $slug }) {
			title
			students {
				pageInfo {
					lastCursor
				}
				edges {
					node {
						name
					}
				}
			}
		}
	}
`

const config = {
	options: ({ slug, uid }) => (uid ? { variables: { uid } } : { variables: { slug } }),
	props: ({ data }) => {
		const { loading, classroom, ...rest } = unwindEdges(data)
		return {
			loading,
			classroom,
			request: {
				...rest,
			},
		}
	},
}

const withClassroomsQuery = makeQuery(query, config)

export default withClassroomsQuery
