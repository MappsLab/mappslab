// @flow

const Map = /* GraphQL */ `
	type Map implements Node {
		uid: String!
		title: String
		slug: String
		description: String
		classroom: Classroom
		pins: PinConnection
		routes: RouteConnection
	}

	# Relationships

	type MapEdge implements Edge {
		cursor: String!
		node: Map
	}

	type MapConnection implements Connection {
		pageInfo: PageInfo!
		edges: [MapEdge]!
	}

	# Input Types

	input GetMapInput {
		uid: String!
	}

	input NewMapInput {
		title: String!
		description: String
		classroomUid: String!
	}

	input ModifyMapInput {
		title: String
		description: String
	}

	# Queries & Mutations

	extend type Query {
		map(input: GetMapInput!): Map!
	}

	extend type Mutation {
		createMap(input: NewMapInput!): Map!
		updateMap(input: ModifyMapInput!): Map!
		removeMap(input: GetMapInput!): Boolean!
		moveMap(input: GetNodeInput!): Map!
	}
`

export default Map
