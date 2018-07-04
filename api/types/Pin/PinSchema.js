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
		mapUids: [String]
		lessonUids: [String]
	}

	input GetPinInput {
		uid: String!
	}

	# Queries & Mutations

	extend type Query {
		pin(input: GetPinInput!): Pin!
	}

	extend type Mutation {
		addPin(input: NewPinArgs!): Pin!
		modifyPin(input: NewPinArgs!): Pin!
		removePin(input: GetPinInput!): Boolean!
	}

	input PinAddedSubscriptionInput {
		mapUid: String!
	}

	extend type Subscription {
		pinAddedToMap(input: PinAddedSubscriptionInput!): Pin!
	}
`

export default Pin
