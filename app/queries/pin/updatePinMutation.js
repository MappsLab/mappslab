// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'
import { query as mapQuery } from '../map/withMapQuery'

const mutation = gql`
	mutation UpdatePin($uid: String!, $title: String, $description: String, $lat: Float, $lng: Float, $addToMaps: [String]) {
		updatePin(input: { uid: $uid, description: $description, title: $title, lat: $lat, lng: $lng, addToMaps: $addToMaps }) {
			uid
			title
			lat
			lng
			owner {
				uid
				name
			}
		}
	}
`

const config = {
	name: 'updatePin',
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
