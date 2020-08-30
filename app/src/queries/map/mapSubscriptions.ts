import gql from 'graphql-tag'
import { SubscribeToMoreOptions, QueryResult } from '@apollo/client'
import * as R from 'ramda'
import _ from 'lodash'
import { Pin, Map } from '../../types-ts'
import { MapResponse } from './mapQuery'
import { pinFragment } from '../pin/fragments'
import { mapFragment } from '../map/fragments'

interface MapUpdatedResponse {
	mapUpdated: { map: Map }
}

interface MapUpdatedSubscriptionVariables {
	mapUid: string
}

const mapUpdated: GetSubscriptionConfig<
	MapResponse,
	MapUpdatedSubscriptionVariables,
	MapUpdatedResponse
> = (query) => ({
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
	variables: {
		mapUid: query?.variables?.uid,
	},
	updateQuery: (previous, { subscriptionData }) => {
		console.log(subscriptionData)
		alert('TODO -merge')
		return previous
	},
})

interface PinAddedResponse {
	pinAddedToMap: { pin: Pin }
}

interface PinAddedSubscriptionVariables {
	mapUid: string
}

const addPin = (o, pinUid, updatedPin) =>
	_.transform(o, (result, v, k) => {
		if (_.isObject(v) && v.uid === pinUid) result[k] = { ...v, ...updatedPin }
		else if (_.isObject(v)) result[k] = updatePin(v, pinUid, updatedPin)
		else result[k] = v
	})

const pinAddedToMap: GetSubscriptionConfig<
	MapResponse,
	PinAddedSubscriptionVariables,
	PinAddedResponse
> = (query) => ({
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

	variables: {
		mapUid: query?.variables?.uid,
	},

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
})

interface PinUpdatedResponse {
	pinUpdated: { pin: Pin }
}

interface PinUpdatedSubscriptionVariables {
	mapUid: string
}

const updatePin = (o, pinUid, updatedPin) =>
	_.transform(o, (result, v, k) => {
		if (_.isObject(v) && v.uid === pinUid) result[k] = { ...v, ...updatedPin }
		else if (_.isObject(v)) result[k] = updatePin(v, pinUid, updatedPin)
		else result[k] = v
	})

const pinUpdated: GetSubscriptionConfig<
	MapResponse,
	PinUpdatedSubscriptionVariables,
	PinUpdatedResponse
> = (query) => ({
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

	variables: {
		mapUid: query?.variables?.uid,
	},

	updateQuery: (previous, { subscriptionData }) => {
		const updatedPin = subscriptionData.data.pinUpdated.pin
		const updatedMap = updatePin(previous.map, updatedPin.uid, updatedPin)
		return {
			...previous,
			map: updatedMap,
		}
	},
})

interface PinDeletedSubscriptionVariables {
	mapUid: string
}

interface PinDeletedResponse {
	pinDeleted: { pin: Pin }
}

type GetSubscriptionConfig<
	QueryResponse = any,
	SubscriptionVariables = any,
	SubscriptionData = any
> = (
	query: QueryResult<QueryResponse>,
) => SubscribeToMoreOptions<
	QueryResponse,
	SubscriptionVariables,
	SubscriptionData
>

interface MapSubscritionConfig {
	mapUid: string
}

const deletePin = (o, pinUid) =>
	_.transform(o, (result, v, k) => {
		if (_.isObject(v) && v.uid === pinUid) return
		else if (_.isObject(v)) result[k] = deletePin(v, pinUid)
		else result[k] = v
	})

const pinDeleted: GetSubscriptionConfig<
	MapResponse,
	PinDeletedSubscriptionVariables,
	PinDeletedResponse
> = (query) => ({
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

	variables: {
		mapUid: query?.variables?.uid,
	},

	updateQuery: (previous, { subscriptionData }) => {
		const deletedPin = subscriptionData.data.pinDeleted.pin
		console.log(`DELETED PIN: ${deletedPin.uid}`)
		const updatedMap = deletePin(previous.map, deletedPin.uid)
		return { map: updatedMap }
	},
})

const mapSubscriptions: GetSubscriptionConfig[] = [
	pinAddedToMap,
	pinUpdated,
	pinDeleted,
	// mapUpdated,
]

export const useMapSubscriptions = (query: QueryResult<MapResponse>) => {
	const { subscribeToMore } = query
	if (!subscribeToMore) return null
	return mapSubscriptions.map((sub) => {
		const { document, variables, updateQuery } = sub(query)
		subscribeToMore({ document, variables, updateQuery })
	})
}
