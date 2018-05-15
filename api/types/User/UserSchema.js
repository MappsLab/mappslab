// @flow

const Pin = /* GraphQL */ `
	type User implements Node {
		uid: ID!
	}

	input UserInput {
		title: String!
	}

	extend type Query {
		user(uid: ID!): User!
	}

	extend type Mutation {
		addUser(input: UserInput!): User!
		modifyUser(input: UserInput!): User!
		removeUser(uid: ID!): Boolean!
	}
`

export default Pin
