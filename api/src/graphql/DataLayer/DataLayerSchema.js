// @flow

const DataLayer = /* GraphQL */ `
	type DataLayer implements Node {
		uid: String!
		uri: String!
		title: String!
	}

	type DataLayerEdge implements Edge {
		cursor: String!
		node: DataLayer
	}

	type DataLayerConnection implements Connection {
		pageInfo: PageInfo!
		edges: [DataLayerEdge]!
	}

	input DataLayerInput {
		kml: Upload!
		title: String!
	}
`

export default DataLayer
