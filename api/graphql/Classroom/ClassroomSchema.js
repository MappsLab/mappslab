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

	input NewClassroomData {
		title: String!
		description: String
	}

	input ModifyClassroomData {
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
		filter: ClassroomFilterParameter
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
		classroom(input: GetNodeInput): Classroom!
		classrooms(input: ClassroomListOptions): ClassroomConnection!
	}

	extend type Mutation {
		createClassroom(input: NewClassroomData!, assignTeachers: [String]): Classroom!
		modifyClassroom(input: ModifyClassroomData!): Classroom!
		removeClassroom(uid: String!): Boolean!
		assignUserToClassroom(input: AssignUserInput!): User!
	}
`

export default Classroom
