// @flow

const Pin = /* GraphQL */ `
	type Pin implements Node {
		uid: ID!
		title: String!
		lat: Float!
		lang: Float!
		owner: User
		maps: MapConnection
		routes: RouteConnection
	}


	# Relationships

	type PinEdge implements Edge {
		cursor: ID!
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
`

export default Pin
