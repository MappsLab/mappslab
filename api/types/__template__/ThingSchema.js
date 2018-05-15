// @flow

const Thing = /* GraphQL */ `
	type Thing implements Node {
		uid: ID!
	}

	input ThingInput {
		title: String!
	}

	extend type Query {
		thing(uid: ID!): Thing!
	}

	extend type Mutation {
		addThing(input: ThingInput!): Thing!
		modifyThing(input: ThingInput!): Thing!
		removeThing(uid: ID!): Boolean!
	}
`

export default Thing
