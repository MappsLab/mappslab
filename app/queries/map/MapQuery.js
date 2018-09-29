// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query MapQuery($uid: String!) {
		map(input: { uid: $uid }) {
			title
			uid
			slug
			pins {
				pageInfo {
					lastCursor
					hasNextPage
				}
				edges {
					node {
						uid
						title
						lat
						lng
						description
						owner {
							uid
							name
						}
					}
				}
			}
		}
	}
`

// type MapQueryResponse = {
// 	data: {
// 		loading: boolean,
// 		map: MapType,
// 		rest: {},
// 	},
// }

// const config = {
// 	options: ({ uid }) => ({
// 		variables: { uid },
// 	}),
// 	props: ({ data }: MapQueryResponse) => {
// 		// $FlowFixMe
// 		console.log(data)
// 		const { loading, map, ...rest } = unwindEdges(data)
// 		return {
// 			loading,
// 			map,
// 			request: {
// 				...rest,
// 			},
// 		}
// 	},
// 	// subscriptionName: 'subscribeToMorePins',
// 	// subscriptionOptions: ({ uid }, callback: (p: PinType) => void = () => {}) => ({
// 	// 	document: newPinAddedQuery,
// 	// 	variables: { mapUid: uid },
// 	// 	updateQuery: (previous, { subscriptionData }) => {
// 	// 		const newPin = subscriptionData.data.pinAddedToMap
// 	// 		// console.log(previous)
// 	// 		callback(newPin)
// 	// 		const { edges } = previous.map.pins

// 	// 		const newEdges = R.uniqBy(R.path(['node', 'uid']))([...edges, { node: newPin, __typename: 'PinEdge' }])
// 	// 		const map = R.assocPath(['pins', 'edges'], newEdges)(previous.map)
// 	// 		return {
// 	// 			...previous,
// 	// 			map,
// 	// 		}
// 	// 	},
// 	// }),
// }

const MapQuery = withDefaultQuery(query)

export default MapQuery
