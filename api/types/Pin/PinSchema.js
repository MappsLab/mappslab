// @flow

const Pin = /* GraphQL */ `
	type Pin implements Node {
		uid: ID!
		title: String!
		lat: Number!
		lang: Number!
		owner: User
		maps: MapConnection
		routes: RouteConnection
	}

	input PinInput {
		title: String!
		lat: Number!
		lang: Number!
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


	# Queries & Mutations

	extend type Query {
		pin(uid: ID!): Pin!
	}

	extend type Mutation {
		addPin(input: PinInput!): Pin!
		modifyPin(input: PinInput!): Pin!
		removePin(uid: ID!: Boolean!
	}
`

export default Pin
