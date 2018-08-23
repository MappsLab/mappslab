// @flow

const Pin = /* GraphQL */ `
	type Pin implements Node {
		uid: String!
		title: String!
		lat: Float!
		lang: Float!
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

	input NewPinArgs {
		title: String!
		lat: Float!
		lang: Float!
		description: String
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
		lang: Float
		description: String
		addToMaps: [String]
		lessonUids: [String]
	}

	# Queries & Mutations

	extend type Query {
		pin(input: GetPinInput!): Pin!
	}

	extend type Mutation {
		addPin(input: NewPinArgs!): Pin!
		updatePin(input: UpdatePinInput!): Pin!
		removePin(input: GetPinInput!): Boolean!
	}

	input PinAddedSubscriptionInput {
		mapUid: String!
	}

	input PinModifiedSubscriptionInput {
		pinUid: String!
	}

	extend type Subscription {
		pinAddedToMap(input: PinAddedSubscriptionInput!): Pin!
		pinModified(input: PinModifiedSubscriptionInput!): Pin!
	}
`

export default Pin
