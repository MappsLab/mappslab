// @flow

const Pin = /* GraphQL */ `
	type Pin implements Node {
		uid: String!
		title: String!
		lat: Float!
		lng: Float!
		description: String
		owner: User
		maps: MapConnection
		routes: RouteConnection
	}

	# Relationships

	type PinEdge implements Edge {
		cursor: String!
		node: Pin
	}

	type PinConnection implements Connection {
		pageInfo: PageInfo!
		edges: [PinEdge]!
	}

	# Inputs

	input NewPinInput {
		title: String!
		lat: Float!
		lng: Float!
		description: String
		deleted: Boolean
		addToMaps: [String]
		lessonUids: [String]
	}

	input GetPinInput {
		uid: String!
	}

	input UpdatePinInput {
		uid: String
		title: String
		lat: Float
		lng: Float
		description: String
		addToMaps: [String]
		lessonUids: [String]
	}

	# Queries & Mutations

	extend type Query {
		pin(input: GetPinInput!): Pin
	}

	extend type Mutation {
		createPin(input: NewPinInput!): Pin!
		updatePin(input: UpdatePinInput!): Pin!
		deletePin(input: GetPinInput!): Success!
	}

	input PinSubscriptionInput {
		mapUid: String!
	}

	extend type Subscription {
		pinAddedToMap(input: PinSubscriptionInput!): Pin!
		pinUpdated(input: PinSubscriptionInput!): Pin!
		pinDeleted(input: PinSubscriptionInput!): Pin!
	}
`

export default Pin
