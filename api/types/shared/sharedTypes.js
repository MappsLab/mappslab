// @flow

import type { UserType } from '../User/UserTypes'

export type DBEdge = {
	fromId: string,
	pred: string,
	toId: string,
}

export type PaginationArgs = {
	first: number,
	after: string,
}

export type GraphQLContext = {
	user: UserType,
}

type Edge = {
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
