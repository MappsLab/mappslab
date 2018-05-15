// @flow

const Pin = /* GraphQL */ `
	type Route implements Node {
		uid: ID!
	}

	input RouteInput {
		title: String!
	}

	extend type Query {
		route(uid: ID!): Route!
	}

	extend type Mutation {
		addRoute(input: RouteInput!): Route!
		modifyRoute(input: RouteInput!): Route!
		removeRoute(uid: ID!): Boolean!
	}
`

export default Pin
