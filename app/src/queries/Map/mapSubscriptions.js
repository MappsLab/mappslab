// @flow
import gql from 'graphql-tag'
import * as R from 'ramda'
import type { SubscriptionCallback, SubscriptionConfig } from 'Types/GraphQL'

const pinFields = /* GraphQL */ `
	uid
	title
	lat
	lng
	description
	draft
	owner {
		uid
		name
	}
`

export const pinAddedToMap: SubscriptionConfig = {
	name: 'pinAddedToMap',
	document: gql`
		subscription pinAddedToMap($mapUid: String!) {
			pinAddedToMap(input: { mapUid: $mapUid }) {
				${pinFields}
			}
		}
	`,
	updateQuery: (callback: SubscriptionCallback | false = false) => (previous, { subscriptionData }) => {
		const newPin = subscriptionData.data.pinAddedToMap
		const { edges } = previous.map.pins

		// Create an updated array of edges
		const newEdges = R.uniqBy(R.path(['node', 'uid']))([...edges, { node: newPin, __typename: 'PinEdge' }])
		// update it into the previous map
		const map = R.assocPath(['pins', 'edges'], newEdges)(previous.map)
		if (callback) callback(previous, newPin)
		return {
			...previous,
			map,
		}
	},
}

export const pinUpdated: SubscriptionConfig = {
	name: 'pinUpdated',
	document: gql`
		subscription pinUpdated($mapUid: String!) {
			pinUpdated(input: { mapUid: $mapUid }) {
				${pinFields}
			}
		}
	`,
	updateQuery: (callback: SubscriptionCallback | false = false) => (previous, { subscriptionData }) => {
		const updatedPin = subscriptionData.data.pinUpdated
		const { edges } = previous.map.pins
		const updatedEdges = edges.map(
			(e) =>
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

export const pinDeleted: SubscriptionConfig = {
	name: 'pinDeleted',
	document: gql`
		subscription pinDeleted($mapUid: String!) {
			pinDeleted(input: { mapUid: $mapUid }) {
				${pinFields}
			}
		}
	`,
	updateQuery: (callback: SubscriptionCallback | false = false) => (previous, { subscriptionData }) => {
		const deletedPin = subscriptionData.data.pinDeleted
		const { edges } = previous.map.pins
		const updatedEdges = edges.filter((edge) => edge.node.uid !== deletedPin.uid)

		const map = R.assocPath(['pins', 'edges'], updatedEdges)(previous.map)

		if (callback) callback(previous, deletedPin)
		return {
			...previous,
			map,
		}
	},
}