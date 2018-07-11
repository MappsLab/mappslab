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

	input MapInput {
		title: String!
		description: String
		classroomUid: String!
	}

	# Queries & Mutations

	extend type Query {
		map(input: GetMapInput!): Map!
	}

	extend type Mutation {
		createMap(input: MapInput!): Map!
		modifyMap(input: MapInput!): Map!
		removeMap(uid: String!): Boolean!
	}

`

export default Map
