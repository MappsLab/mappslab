import gql from 'graphql-tag'
import { SubscribeToMoreOptions } from 'apollo-client'
import { QueryResult } from 'react-apollo'
import * as R from 'ramda'
import { Pin, Map } from '../../types-ts'
import { MapResponse } from './mapQuery'
import { pinFragment } from '../pin/fragments'
import { mapFragment } from '../map/fragments'

interface MapUpdatedResponse {
	mapUpdated: { map: Map }
}

export const mapUpdated: SubscribeToMoreOptions = {
	document: gql`
		subscription mapUpdated($mapUid: String!) {
			mapUpdated(input: { mapUid: $mapUid }) {
				map {
					...MapFragment
				}
			}
		}
		${mapFragment}
	`,
	updateQuery: (previous, { subscriptionData }) => {
		console.log(subscriptionData)
		alert('TODO -merge')
		return previous
	},
}

interface PinAddedResponse {
	pinAddedToMap: { pin: Pin }
}

export const pinAddedToMap: SubscribeToMoreOptions = {
	document: gql`
		subscription pinAddedToMap($mapUid: String!) {
			pinAddedToMap(input: { mapUid: $mapUid }) {
				pin {
					...PinFragment
				}
			}
		}
		${pinFragment}
	`,
	updateQuery: (previous, { subscriptionData }) => {
		const newPin = subscriptionData.data.pinAddedToMap.pin
		const { edges } = previous.map.pins

		// Create an updated array of edges
		const newEdges = R.uniqBy(R.path(['node', 'uid']))([
			...edges,
			{ node: newPin, __typename: 'PinEdge' },
		])
		// update it into the previous map
		const map = R.assocPath(['pins', 'edges'], newEdges)(previous.map)
		return {
			...previous,
			map,
		}
	},
}

interface PinUpdatedResponse {
	pinUpdated: { pin: Pin }
}

export const pinUpdated: SubscribeToMoreOptions = {
	document: gql`
		subscription pinUpdated($mapUid: String!) {
			pinUpdated(input: { mapUid: $mapUid }) {
				pin {
					...PinFragment
				}
			}
		}
		${pinFragment}
	`,
	updateQuery: (previous, { subscriptionData }) => {
		const updatedPin = subscriptionData.data.pinUpdated
		const { edges } = previous.map.pins
		const updatedEdges = edges.map((e) =>
			e.node.uid === updatedPin.uid
				? {
						node: {
							...e.node,
							...updatedPin,
						},
						...e,
				  }
				: e,
		)
		const map = R.assocPath(['pins', 'edges'], updatedEdges)(previous.map)

		return {
			...previous,
			map,
		}
	},
}

interface PinDeletedResponse {
	pinDeleted: { pin: Pin }
}

export const pinDeleted: SubscribeToMoreOptions = {
	document: gql`
		subscription pinDeleted($mapUid: String!) {
			pinDeleted(input: { mapUid: $mapUid }) {
				pin {
					...PinFragment
				}
			}
		}
		${pinFragment}
	`,
	updateQuery: (previous, { subscriptionData }) => {
		const deletedPin = subscriptionData.data.pinDeleted.pin
		const { edges } = previous.map.pins
		const updatedEdges = edges.filter(
			(edge) => edge.node.uid !== deletedPin.uid,
		)

		const map = R.assocPath(['pins', 'edges'], updatedEdges)(previous.map)

		return {
			...previous,
			map,
		}
	},
}

const mapSubscriptions = [pinAddedToMap, pinUpdated, pinDeleted, mapUpdated]

export const useMapSubscriptions = (query: QueryResult<MapResponse>) => {
	const { refetch, subscribeToMore } = query
	const subscriptions = mapSubscriptions.map(({ document, updateQuery }) =>
		subscribeToMore({ document, updateQuery }),
	)
}
