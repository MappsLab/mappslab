// @flow
import gql from 'graphql-tag'
import withMutation from '../withMutation'
import { unwindEdges } from '../utils'
import { query as mapQuery } from '../map/withMapQuery'

const mutation = gql`
	mutation createPin($title: String!, $lat: Float!, $lang: Float!, $mapUids: [String]) {
		addPin(input: { title: $title, lat: $lat, lang: $lang, mapUids: $mapUids }) {
			uid
			title
			lat
			lang
			owner {
				uid
				name
			}
			maps {
				pageInfo {
					hasNextPage
					lastCursor
				}
				edges {
					cursor
					node {
						uid
						title
					}
				}
			}
		}
	}
`

const config = {
	options: (props) => ({
		refetchQueries: [
			{
				query: mapQuery,
				variables: {
					uid: props.mapUid,
				},
			},
		],
	}),
	props: (response) => {
		const { data, loading, networkStatus, ...rest } = response
		const pin = response.addPin ? unwindEdges(response.addPin) : null
		return {
			loading,
			networkStatus,
			pin,
			request: {
				...rest,
			},
		}
	},
}

const withViewerLoginMutation = withMutation(mutation, config)

export default withViewerLoginMutation
