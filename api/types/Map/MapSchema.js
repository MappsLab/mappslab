// @flow

const Map = /* GraphQL */ `
	type Map implements Node {
		uid: ID!
		title: String
		owner: User
		classroom: Classroom
		pins: PinConnection 
		routes: RouteConnection
	}

	input MapInput {
		title: String!
	}

	# Relationships

	type MapEdge implements Edge {
		cursor: ID!
		node: Classroom
	}

	type MapConnection implements Connection {
		pageInfo: PageInfo!
		edges: [MapEdge]!
	}

	# Queries & Mutations

	extend type Query {
		map(uid: ID!): Map!
	}

	extend type Mutation {
		addMap(input: MapInput!): Map!
		modifyMap(input: MapInput!): Map!
		removeMap(uid: ID!): Boolean!
	}
`

export default Map
