// @flow
import { map, prop, last } from 'ramda'
import type { PaginationArgs, DBNode, PageType } from '../types/shared/sharedTypes'
import { defaultPaginationArgs } from '../database/utils'

export const itemsToNodes = map((node) => ({ cursor: node.uid, node }))

export const assemblePage = (items: Array<DBNode>, { first, after }: PaginationArgs = defaultPaginationArgs): PageType => {
	// The database will return +1 item from the 'first' argument. We'll use that to determine if there is
	// a next page. Here, we'll trim it from `items` so this extra item does not appear in the edges array.
	const edges = items.length ? itemsToNodes(items.slice(0, first)) : []
	const lastCursor = edges.length ? prop('cursor', last(edges)) : null
	const hasNextPage = items.length > first
	const hasPreviousPage = after !== undefined && after !== '0x0'
	return {
		pageInfo: {
			lastCursor,
			hasNextPage,
			hasPreviousPage,
		},
		edges,
	}
}
