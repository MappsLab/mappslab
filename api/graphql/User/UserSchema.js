// @flow

const User = /* GraphQL */ `
	type User implements Node {
		uid: String!
		name: String!
		classrooms: ClassroomConnection
		maps: MapConnection
		roles: [String]
		pins(input: PaginationInput): PinConnection
		email: String
	}

	type Token {
		token: String!
		expires: Int!
	}

	union LoginResult = LoginSuccess | RequiresReset

	type RequiresReset {
		resetToken: String!
		viewer: User
	}

	type LoginSuccess {
		jwt: Token
		viewer: User
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
		uid: String
		email: String
	}

	input CredentialsInput {
		email: String
		uid: String
		password: String!
	}

	input UpdatePasswordInput {
		resetToken: String!
		password: String!
	}

	input UserSortParameter {
		name: SortOrder
	}

	input UserFilterParameter {
		name: StringOperators
		# User-specific relationship filters
		userTeachesIn: RelationshipOperators
		userLearnsIn: RelationshipOperators
	}

	input UsersListOptions {
		first: Int
		after: String
		sort: UserSortParameter
		where: UserFilterParameter
	}

	input SetTemporaryPasswordInput {
		uid: String!
		temporaryPassword: String!
	}

	# User Creation

	input NewStudentData {
		name: String!
		email: String
		temporaryPassword: String!
		addToClassrooms: [String!]
	}

	input NewTeacherData {
		name: String!
		email: String!
		temporaryPassword: String
		addToClassrooms: [String!]
	}

	input NewAdminData {
		name: String!
		email: String!
		temporaryPassword: String
	}

	input UpdateUserInput {
		uid: String
		name: String
		email: String
		addToClassrooms: [String!]
		removeFromClassrooms: [String!]
	}

	# Queries & Mutations

	extend type Query {
		user(input: GetUserInput): User
		users(input: UsersListOptions): UserConnection!
		currentViewer: LoginSuccess
	}

	extend type Mutation {
		loginViewer(input: CredentialsInput!): LoginResult!
		createStudent(input: NewStudentData!): User!
		createTeacher(input: NewTeacherData!): User!
		createAdmin(input: NewAdminData!): User!
		updateUser(input: UpdateUserInput!): User!
		# deleteUser(uid: String!): Boolean!
		requestPasswordReset(input: GetUserInput): Success!
		resetPassword(input: UpdatePasswordInput!): LoginResult!
		setTemporaryPassword(input: SetTemporaryPasswordInput!): Success!
	}
`

export default User
