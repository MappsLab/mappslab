// @flow

const Route = /* GraphQL */ `
	type Route implements Node {
		uid: ID!
		title: String
		owner: User
		lines: [Line]
		maps: [Map]
	}

	type Line {
		from: Pin
		to: Pin
	}

	input RouteInput {
		title: String!
	}

	# Relationships

	type RouteEdge implements Edge {
		cursor: ID!
		node: Route
	}

	type RouteConnection implements Connection {
		pageInfo: PageInfo!
		edges: [RouteEdge]!
	}

	# Queries & Mutations

	extend type Query {
		route(uid: ID!): Route!
	}

	extend type Mutation {
		addRoute(input: RouteInput!): Route!
		modifyRoute(input: RouteInput!): Route!
		removeRoute(uid: ID!): Boolean!
	}
`

export default Route
