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

export type PageInfo = {
	hasNextPage: boolean,
	lastCursor: string,
}

export type PageType = {
	pageInfo: PageInfo,
	edges: [Edge],
}
