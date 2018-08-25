// @flow
import gql from 'graphql-tag'
import withMutation from '../withMutation'
import { unwindEdges } from '../utils'
import { query as mapQuery } from '../map/withMapQuery'

const mutation = gql`
	mutation UpdatePin($uid: String!, $title: String, $description: String, $lat: Float, $lang: Float, $addToMaps: [String]) {
		updatePin(input: { uid: $uid, description: $description, title: $title, lat: $lat, lang: $lang, addToMaps: $addToMaps }) {
			uid
			title
			lat
			lang
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

const withUpdatePinMutation = withMutation(mutation, config)

export default withUpdatePinMutation
