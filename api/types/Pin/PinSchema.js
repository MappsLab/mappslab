// @flow

const Pin = /* GraphQL */ `
	type Pin implements Node {
		uid: ID!
		title: String!
		lat: Number!
		lang: Number!
		owner: User
		maps: [Map]
	}

	input PinInput {
		title: String!
		lat: Number!
		lang: Number!
	}

	extend type Query {
		pin(uid: ID!): Pin!
	}

	extend type Mutation {
		addPin(input: PinInput!): Pin!
		modifyPin(input: PinInput!): Pin!
		removePin(uid: ID!: Boolean!
	}
`

export default Pin
