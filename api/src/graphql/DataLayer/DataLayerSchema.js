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

	input GetDataLayerInput {
		uid: String!
	}

	input DataLayerSortParameters {
		title: String
	}

	input DataLayerWhereParameters {
		title: StringOperators
	}

	input GetDataLayersInput {
		first: Int
		after: String
		sort: DataLayerSortParameters
		where: DataLayerWhereParameters
	}

	extend type Query {
		dataLayer(input: GetDataLayerInput!): DataLayer
		dataLayers(input: GetDataLayersInput): DataLayerConnection!
	}
`

export default DataLayer
