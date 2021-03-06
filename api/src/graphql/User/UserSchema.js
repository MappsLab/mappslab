// @flow

const User = /* GraphQL */ `
	type User implements Node {
		uid: String!
		name: String!
		classrooms: ClassroomConnection
		maps: MapConnection
		roles: [String]
		pins(input: PaginationInput): PinConnection
		routes(input: PaginationInput): RouteConnection
		email: String
	}

	type Token {
		token: String!
		expires: String!
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
		roles: ListOperators
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

	input CreateStudentInput {
		name: String!
		email: String
		temporaryPassword: String!
		addToClassrooms: [String!]
	}

	input CreateTeacherInput {
		name: String!
		email: String!
		temporaryPassword: String
		addToClassrooms: [String!]
	}

	input CreateAdminInput {
		name: String!
		email: String!
		temporaryPassword: String
	}

	input UpdateUserInput {
		uid: String!
		name: String
		email: String
		addToClassrooms: [String!]
		removeFromClassrooms: [String!]
	}

	# Queries & Mutations

	extend type Query {
		user(input: GetUserInput): User
		users(input: UsersListOptions): UserConnection!
		teachers(input: UsersListOptions): UserConnection!
		students(input: UsersListOptions): UserConnection!
		currentViewer: LoginSuccess
	}

	extend type Mutation {
		loginViewer(input: CredentialsInput!): LoginResult!
		createStudent(input: CreateStudentInput!): User!
		createTeacher(input: CreateTeacherInput!): User!
		createAdmin(input: CreateAdminInput!): User!
		updateUser(input: UpdateUserInput!): User!
		# deleteUser(uid: String!): Boolean!
		requestPasswordReset(input: GetUserInput): Success!
		resetPassword(input: UpdatePasswordInput!): LoginResult!
		setTemporaryPassword(input: SetTemporaryPasswordInput!): Success!
	}
`

export default User
