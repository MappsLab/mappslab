// @flow

const userFields = /* GraphQL */ `
	uid: ID!
	name: String
	email: String
	classrooms: ClassroomConnection
	maps: MapConnection
	role: String
	pins(input: PaginationInput): PinConnection
`

const User = /* GraphQL */ `
	type User implements Node {
		${userFields}
	}

	type Teacher implements Node {
		${userFields}
	}

	input UserInput {
		title: String!
	}

	# Relationships

	type UserEdge implements Edge {
		cursor: ID!
		node: User
	}

	type UserConnection implements Connection {
		pageInfo: PageInfo!
		edges: [UserEdge]!
	}

	# Queries & Mutations

	input CredentialsInput {
		email: String
		uid: String
		password: String!
	}

	type Token {
		token: String!
		expires: Int!
	}

	type LoginPayload {
		jwt: Token!
		viewer: User!
	}

	extend type Query {
		user(uid: ID!): User!
	}

	extend type Mutation {
		loginViewer(credentials: CredentialsInput!): LoginPayload!
		registerViewer(credentials: CredentialsInput!): LoginPayload!
		addUser(input: UserInput!): User!
		modifyUser(input: UserInput!): User!
		removeUser(uid: ID!): Boolean!
	}
`

export default User
