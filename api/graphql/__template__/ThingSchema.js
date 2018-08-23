// @flow

const Thing = /* GraphQL */ `
	type Thing implements Node {
		uid: String!
	}

	input ThingInput {
		title: String!
	}

	extend type Query {
		thing(uid: String!): Thing!
	}

	extend type Mutation {
		addThing(input: ThingInput!): Thing!
		modifyThing(input: ThingInput!): Thing!
		removeThing(uid: String!): Boolean!
	}
`

export default Thing
