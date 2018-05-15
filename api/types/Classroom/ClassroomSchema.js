// @flow

const Pin = /* GraphQL */ `
	type Classroom implements Node {
		uid: ID!
	}

	input ClassroomInput {
		title: String!
	}

	extend type Query {
		classroom(uid: ID!): Classroom!
	}

	extend type Mutation {
		addClassroom(input: ClassroomInput!): Classroom!
		modifyClassroom(input: ClassroomInput!): Classroom!
		removeClassroom(uid: ID!): Boolean!
	}
`

export default Pin
