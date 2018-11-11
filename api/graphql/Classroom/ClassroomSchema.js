// @flow

const Classroom = /* GraphQL */ `
	type Classroom implements Node {
		uid: String!
		title: String
		slug: String
		description: String
		students: UserConnection
		teachers: UserConnection
		maps: MapConnection
	}

	input NewClassroomInput {
		title: String!
		description: String
	}

	input UpdateClassroomInput {
		uid: String!
		title: String
		description: String
	}

	# Relationships

	input ClassroomSortParameter {
		title: SortOrder
	}

	input ClassroomFilterParameter {
		title: StringOperators
	}

	input ClassroomListOptions {
		first: Int
		after: String
		sort: ClassroomSortParameter
		where: ClassroomFilterParameter
	}

	input AssignUserInput {
		classroomUid: String!
		userUid: String!
	}

	type ClassroomEdge implements Edge {
		cursor: String!
		node: Classroom
	}

	type ClassroomConnection implements Connection {
		pageInfo: PageInfo!
		edges: [ClassroomEdge]!
	}

	# Queries & Mutations

	extend type Query {
		classroom(input: GetNodeInput): Classroom
		classrooms(input: ClassroomListOptions): ClassroomConnection!
	}

	extend type Mutation {
		createClassroom(input: NewClassroomInput!, assignTeachers: [String]): Classroom!
		updateClassroom(input: UpdateClassroomInput!): Classroom!
		removeClassroom(uid: String!): Boolean!
		assignUserToClassroom(input: AssignUserInput!): User!
	}
`

export default Classroom
