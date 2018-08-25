// @flow
import gql from 'graphql-tag'
import withMutation from '../withMutation'
import { unwindEdges } from '../utils'
import { query as mapQuery } from '../map/withMapQuery'

const mutation = gql`
	mutation createPin($title: String!, $description: String, $lat: Float!, $lang: Float!, $addToMaps: [String]) {
		addPin(input: { title: $title, description: $description, lat: $lat, lang: $lang, addToMaps: $addToMaps }) {
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
	name: 'createPin',
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
	// props: (response) => {
	// 	const { data, loading, networkStatus, ...rest } = response
	// 	const pin = response.addPin ? unwindEdges(response.addPin) : null
	// 	return {
	// 		loading,
	// 		networkStatus,
	// 		pin,
	// 		request: {
	// 			...rest,
	// 		},
	// 	}
	// },
}

const withCreatePinMutation = withMutation(mutation, config)

export default withCreatePinMutation
