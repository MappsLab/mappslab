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
		uid: String! 
	}

	interface Edge {
		cursor: String!
	}

	interface Connection {
		pageInfo: PageInfo!
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

	input GetNodeInput {
		uid: String 
		slug: String
	}

	input PaginationInput {
		first: Int,
		after: String!,
		filter: [QueryFilter],
	}

	type PageInfo {
		hasNextPage: Boolean!
		lastCursor: String!
	}
`
