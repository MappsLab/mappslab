// @flow

import type { ViewerType } from '../User/UserType'

export type PaginationArgs = {
	first: number,
	after: string,
}

export type GraphQLContext = {
	viewer: ViewerType,
}

type Edge = {
	cursor: string,
	node: Object,
}

type PageInfo = {
	hasNextPage: boolean,
	hasPreviousPage: boolean,
	lastCursor: string,
}

export type PageType = {
	pageInfo: PageInfo,
	edges: [Edge],
}
