// @flow
import { query } from 'Database'
import type { RouteType } from 'Types/RouteTypes'
import type { PaginationFilterArgs } from 'Types/sharedTypes'
import { createQueryStrings } from 'Database/utils'
import { publicFields, parseRouteResult, parseRouteResults } from './routeDBSchema'

export const getRoute = async (uid: string): Promise<RouteType | null> => {
	const q = /* GraphQL */ `
		query getRoute {
			getRoute(func: uid(${uid})) @filter(eq(type, "route") AND eq(deleted, false)) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	if (!result || !result.getRoute) return null
	return parseRouteResult(result.getRoute)
}

// query getRoute {
// 	getRoute(func: uid(undefined)) @filter(eq(type, "route") ANDeq(deleted, false)) {
// 		uid
// 		title
// 		updatedAt
// 		pins: includes_pin @facets(order) {
// 			uid
// 			title
// 		}
// 		owner: ~owns_route {
// 			uid
// 			username
// 		}
// 	}
// }

export const getRoutes = async (args?: PaginationFilterArgs = {}): Promise<Array<RouteType>> => {
	const { varBlocks, filterString, paginationString } = createQueryStrings(args)
	const q = /* GraphQL */ `
		query getRoutes {
			${varBlocks}
			getRoutes(func: eq(type, "route") ${paginationString}) ${filterString} {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	if (!result || !result.getRoutes) return []
	const parsed = await parseRouteResults(result.getRoutes)
	return parsed
}
