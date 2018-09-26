// @flow
import { prop, last } from 'ramda'
import type { PaginationArgs } from 'Types/sharedTypes'
import { defaultPaginationArgs } from 'Database/utils'

interface DBNode {
	uid: string;
}

type Edge<T> = {
	cursor: string,
	node: T,
}

type PageInfo = {
	hasNextPage: boolean,
	lastCursor: null | string,
}

type PageType<T> = {
	pageInfo: PageInfo,
	edges: Array<?Edge<T>>,
}

export const itemToEdge = <T: DBNode>(node: T): Edge<T> => ({ cursor: node.uid, node })

export const assemblePage = <T: DBNode>(items: Array<T>, { first }: PaginationArgs = defaultPaginationArgs): PageType<T> => {
	// The database will return +1 item from the 'first' argument. We'll use that to determine if there is
	// a next page. Here, we'll trim it from `items` so this extra item does not appear in the edges array.
	const edges = items.length ? items.slice(0, first).map(itemToEdge) : []
	// $FlowFixMe -- Ramda needs better flow typing
	const lastCursor = edges.length ? prop('cursor', last(edges)) : null
	const hasNextPage = items.length > first
	// const hasPreviousPage = after !== undefined && after !== '0x0'
	return {
		pageInfo: {
			lastCursor,
			hasNextPage,
			// hasPreviousPage,
		},
		edges,
	}
}
