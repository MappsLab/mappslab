// @flow

const Tileset = /* GraphQL */ `
	type Tileset implements Node {
		uid: String!
		baseUri: String!
		maxZoom: Int!
	}
`

export default Tileset
