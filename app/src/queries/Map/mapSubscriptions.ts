import gql from 'graphql-tag'
import * as R from 'ramda'
import { Pin, Map, SubscriptionCallback, SubscriptionConfig } from 'Types'
import { MapResponse } from './MapQuery'
import { pinFragment } from 'Queries/Pin/fragments'
import { mapFragment } from 'Queries/Map/fragments'

interface MapUpdatedResponse {
	mapUpdated: { map: Map }
}

export const mapUpdated: SubscriptionConfig<
	MapResponse,
	MapUpdatedResponse
> = ({ refetch }) => ({
	name: 'mapUpdated',
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
	updateQuery: (callback: SubscriptionCallback | false = false) => (
		previous,
		{ subscriptionData },
	) => {
		refetch()
		return previous
		// console.log(previous, subscriptionData)
		// if (callback) callback(previous, map)
		// return Object.assign({}, previous, {
		// 	map: {
		// 		...map,
		// 	},
		// })
	},
})

interface PinAddedResponse {
	pinAddedToMap: { pin: Pin }
}

export const pinAddedToMap: SubscriptionConfig<
	MapResponse,
	PinAddedResponse
> = {
	name: 'pinAddedToMap',
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
	updateQuery: (callback: SubscriptionCallback | false = false) => (
		previous,
		{ subscriptionData },
	) => {
		const newPin = subscriptionData.data.pinAddedToMap.pin
		const { edges } = previous.map.pins

		// Create an updated array of edges
		const newEdges = R.uniqBy(R.path(['node', 'uid']))([
			...edges,
			{ node: newPin, __typename: 'PinEdge' },
		])
		// update it into the previous map
		const map = R.assocPath(['pins', 'edges'], newEdges)(previous.map)
		if (callback) callback(previous, newPin)
		return {
			...previous,
			map,
		}
	},
}

interface PinUpdatedResponse {
	pinUpdated: { pin: Pin }
}

export const pinUpdated: SubscriptionConfig<MapResponse, PinUpdatedResponse> = {
	name: 'pinUpdated',
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
	updateQuery: (callback: SubscriptionCallback | false = false) => (
		previous,
		{ subscriptionData },
	) => {
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

		if (callback) callback(previous, updatedPin)
		return {
			...previous,
			map,
		}
	},
}

interface PinDeletedResponse {
	pinDeleted: { pin: Pin }
}

export const pinDeleted: SubscriptionConfig<MapResponse, PinDeletedResponse> = {
	name: 'pinDeleted',
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
	updateQuery: (callback: SubscriptionCallback | false = false) => (
		previous,
		{ subscriptionData },
	) => {
		const deletedPin = subscriptionData.data.pinDeleted.pin
		const { edges } = previous.map.pins
		const updatedEdges = edges.filter(
			(edge) => edge.node.uid !== deletedPin.uid,
		)

		const map = R.assocPath(['pins', 'edges'], updatedEdges)(previous.map)

		if (callback) callback(previous, deletedPin)
		return {
			...previous,
			map,
		}
	},
}
