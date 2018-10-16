// @flow
import DateTime from './DateTime'

export const coreTypeResolvers = {
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

	input GetNodeInput {
		uid: String
		slug: String
	}

	input PaginationInput {
		first: Int
		after: String!
		filter: [String]
	}

	enum SortOrder {
		ASC
		DESC
	}

	input NumberRange {
		start: Float!
		end: Float!
	}

	input StringOperators {
		eq: String
		notEq: String
		contains: String
	}

	input BooleanOperators {
		eq: Boolean
	}

	input NumberOperators {
		eq: Float
		notEq: Float
		lt: Float
		lte: Float
		gt: Float
		gte: Float
		between: NumberRange
	}

	input DateRange {
		start: DateTime!
		end: DateTime!
	}

	input DateOperators {
		eq: DateTime
		notEq: DateTime
		before: DateTime
		after: DateTime
		between: DateRange
	}

	type PageInfo {
		hasNextPage: Boolean!
		hasPrevPage: Boolean!
		lastCursor: String
	}

	type Success {
		success: Boolean!
		messages: [String]!
	}
`
