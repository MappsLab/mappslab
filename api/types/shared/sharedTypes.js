// @flow

import type { UserType } from '../User/UserTypes'

type Operator = 'eq' | 'le' | 'lt' | 'ge' | 'gt' | 'uid' | 'allofterms' | 'anyofterms' | 'regexp' | 'alloftext' | 'uid_in' | 'has'

export type Filter = {
	key: string,
	value: string,
	operator?: Operator,
}

export type DBEdge = {
	fromUid: string,
	pred: string,
	toUid: string,
}

export type DBNode = Object & {
	uid: string,
}

export type PaginationArgs = {
	first: number,
	after: string,
}

export type PaginationInput = {
	input: PaginationArgs,
}

export type GetNodeArgs =
	| {
			uid: string,
	  }
	| {
			slug: string,
	  }

export type GetNodeInput = {
	input: GetNodeArgs,
}

export type GraphQLContext = {
	viewer: UserType,
}

export type Edge = {
	cursor: string,
	node: Object,
}

export type PageInfo = {
	hasNextPage: boolean,
	lastCursor: string,
}

export type PageType = {
	pageInfo: PageInfo,
	edges: [Edge],
}
