// @flow
import { map, prop, last } from 'ramda'
import type { PaginationArgs, DBNode, Edge, PageType } from 'Types/sharedTypes'
import { defaultPaginationArgs } from 'Database/utils'

export const itemsToNodes = map((node) => ({ cursor: node.uid, node }))

export const assemblePage = (items: Array<DBNode>, { first }: PaginationArgs = defaultPaginationArgs): PageType => {
	// The database will return +1 item from the 'first' argument. We'll use that to determine if there is
	// a next page. Here, we'll trim it from `items` so this extra item does not appear in the edges array.
	const edges: Array<?Edge> = items.length ? itemsToNodes(items.slice(0, first)) : []
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
