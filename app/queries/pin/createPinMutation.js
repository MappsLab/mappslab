// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'
import { query as mapQuery } from '../map/MapQuery'

const mutation = gql`
	mutation createPin($title: String!, $description: String, $lat: Float!, $lng: Float!, $addToMaps: [String]) {
		createPin(input: { title: $title, description: $description, lat: $lat, lng: $lng, addToMaps: $addToMaps }) {
			uid
			title
			lat
			lng
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

export default withDefaultMutation(mutation, config)
