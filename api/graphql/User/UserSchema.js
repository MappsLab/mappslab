// @flow

const userFields = /* GraphQL */ `
	uid: String!
	username: String!
	name: String
	classrooms: ClassroomConnection
	maps: MapConnection
	roles: [String]
	pins(input: PaginationInput): PinConnection
`

const User = /* GraphQL */ `

	type User implements Node {
		${userFields}
	}

	type Viewer implements Node {
		email: String
		${userFields}
	}

	type Teacher implements Node {
		${userFields}
	}

	input UserInput {
		title: String!
	}

	type Token {
		token: String!
		expires: Int!
	}

	union LoginResult = LoginSuccess | RequiresReset

	type RequiresReset {
		resetToken: String!
		viewer: Viewer
	}

	type LoginSuccess {
		jwt: Token
		viewer: Viewer
	}

	# Relationships

	type UserEdge implements Edge {
		cursor: String!
		node: User
	}

	type UserConnection implements Connection {
		pageInfo: PageInfo!
		edges: [UserEdge]!
	}

	# Inputs

	input GetUserInput {
		uid: String!
	}

	input CredentialsInput {
		email: String
		uid: String
		password: String!
	}

	input UpdatePasswordInput {
		uid: String!
		password: String!
	}

	# Queries & Mutations

	extend type Query {
		user(input: GetUserInput): User!
		currentViewer: LoginSuccess
	}

	extend type Mutation {
		loginViewer(credentials: CredentialsInput!): LoginResult!
		registerViewer(credentials: CredentialsInput!): LoginResult!
		updatePassword(credentials: UpdatePasswordInput!): LoginResult!
		addUser(input: UserInput!): User!
		modifyUser(input: UserInput!): User!
		removeUser(uid: String!): Boolean!
	}
`

export default User
