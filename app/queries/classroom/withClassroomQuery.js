// @flow
import gql from 'graphql-tag'
import { unwindEdges } from 'Utils'
import withQuery from '../withQuery'

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
						role
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

const withClassroomsQuery = withQuery(query, config)

export default withClassroomsQuery
