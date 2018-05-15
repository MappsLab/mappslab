// @flow

const Pin = /* GraphQL */ `
	type Map implements Node {
		uid: ID!
	}

	input MapInput {
		title: String!
	}

	extend type Query {
		map(uid: ID!): Map!
	}

	extend type Mutation {
		addMap(input: MapInput!): Map!
		modifyMap(input: MapInput!): Map!
		removeMap(uid: ID!): Boolean!
	}
`

export default Pin
