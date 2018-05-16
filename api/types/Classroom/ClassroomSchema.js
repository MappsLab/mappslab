// @flow

const Classroom = /* GraphQL */ `
	type Classroom implements Node {
		uid: ID!
		title: String
		students: UserConnection
		teachers: UserConnection
		maps: MapConnection
	}

	input ClassroomInput {
		title: String!
	}

	# Relationships

	type ClassroomEdge implements Edge {
		cursor: ID!
		node: Classroom
	}

	type ClassroomConnection implements Connection {
		pageInfo: PageInfo!
		edges: [ClassroomEdge]!
	}

	# Queries & Mutations

	extend type Query {
		classroom(uid: ID!): Classroom!
		classrooms(input: PaginationInput!): ClassroomConnection! 
	}

	extend type Mutation {
		addClassroom(input: ClassroomInput!): Classroom!
		modifyClassroom(input: ClassroomInput!): Classroom!
		removeClassroom(uid: ID!): Boolean!
	}
`

export default Classroom
