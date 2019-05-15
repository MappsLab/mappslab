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
		baseImage: Image
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

	input CreateMapInput {
		title: String!
		description: String
		addToClassrooms: [String!]
	}

	input UpdateMapInput {
		uid: String!
		title: String
		description: String
		baseImage: Upload
	}

	input MapSortParameter {
		title: SortOrder
	}

	input MapFilterParameter {
		title: StringOperators
	}

	input MapListOptions {
		first: Int
		after: String
		sort: MapSortParameter
		where: MapFilterParameter
	}

	# Queries & Mutations

	extend type Query {
		map(input: GetMapInput!): Map!
		maps(input: MapListOptions): MapConnection!
	}

	extend type Mutation {
		createMap(input: CreateMapInput!): Map!
		updateMap(input: UpdateMapInput!): Map!
		deleteMap(input: GetMapInput!): Boolean!
		# moveMap(input: GetNodeInput!): Map!
	}
`

export default Map
