// @flow
import DateTime from './DateTime'

export const coreTypeResolvers = {
	QueryOperator: {
		EQ: '==',
		NOTEQ: '!=',
	},
	DateTime,
}

export const coreTypes = /* GraphQL */ `
	scalar Upload
	scalar DateTime

	interface Node {
		uid: ID
	}

	interface Edge {
		cursor: String!
	}

	interface Connection {
		pageInfo: PageInfo!
		edges: [Node]!
	}

	enum QueryOperator {
		EQ
		NOTEQ
	}

	input QueryFilter {
		key: String!,
		value: String!,
		operator: QueryOperator
	}	

	input PaginationInput {
		first: Int,
		after: ID,
		filter: [QueryFilter],
	}

	type PageInfo {
		hasNextPage: Boolean!
		lastCursor: ID
	}
`
