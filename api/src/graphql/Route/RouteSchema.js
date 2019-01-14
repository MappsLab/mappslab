// @flow

const Route = /* GraphQL */ `
	type Route implements Node {
		uid: String!
		title: String
		owner: User!
		pins: PinConnection
		maps: MapConnection
	}

	input NewRouteInput {
		title: String
		addPin: String
		pins: [String]
	}

	input UpdateRouteInput {
		title: String
		addPin: String
		removePin: String
		pins: [String]
		removePins: [String]
	}

	input GetRouteInput {
		uid: String!
	}

	input RouteFilterParameter {
		routeContainsPin: RelationshipOperators
		routeWithinMap: RelationshipOperators
	}

	input RouteListOptions {
		first: Int
		after: String
		where: RouteFilterParameter
	}

	# Relationships

	type RouteEdge implements Edge {
		cursor: String!
		node: Route
	}

	type RouteConnection implements Connection {
		pageInfo: PageInfo!
		edges: [RouteEdge]!
	}

	# Queries & Mutations

	extend type Query {
		route(input: GetRouteInput!): Route!
		routes(input: RouteListOptions): RouteConnection!
	}

	extend type Mutation {
		createRoute(input: NewRouteInput!): Route!
		addPinToRoute(input: AddPinToRouteInput!): Route!
		updateRoute(input: UpdateRouteInput!): Route!
		deleteRoute(uid: String!): Boolean!
	}
`

export default Route
