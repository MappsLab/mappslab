// @flow
import { head, prop, last } from 'ramda'
import { query } from '../../../database'
import type { UserType } from '../../User/UserTypes'
import type { PaginationArgs, PageType } from '../../shared/sharedTypes'
import { publicFields } from './pinDBSchema'
export const getPin = () => {}

export const getPins = () => {}

export const getPinsByUser = async (user: UserType, args: PaginationArgs): Promise<PageType | Error> => {
	const { first = 50, after = '0x0', filter } = args.input
	const { uid } = user
	const q = /* GraphQL */ `
		query getPins($uid: string, $first: int, $after: string) {
			getPins(func: uid(${uid})) {
				pinned (first: $first, after: $after) {
					${publicFields}
				}
			}
		}
	`
	const result = await query(q, { uid, first, after })
	const edges = head(result.getJson().getPins).pinned.map((p) => ({ cursor: p.uid, node: p }))
	const lastCursor = prop('cursor', last(edges))
	return {
		pageInfo: {
			lastCursor,
			hasNextPage: true,
			hasPreviousPage: after !== '0x0',
		},
		edges,
	}
}
