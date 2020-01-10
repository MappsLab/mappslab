// @flow
import faker from 'faker'
import type { RouteType, NewRouteData } from 'Types/RouteTypes'
import type { UserType } from 'Types/UserTypes'
import Route from 'Models/Route'
import { request } from './db'
/**
 * Route Read
 */

export const getDBRoutes = Route.getRoutes

/**
 * Route Creation
 */

const createRouteMutation = /* GraphQL */ `
	mutation CreateRoute($input: NewRouteInput!) {
		createRoute(input: $input) {
			uid
			title
			pins {
				edges {
					cursor
					node {
						uid
						title
					}
				}
			}
		}
	}
`

export const createRoute = async (
	input: NewRouteData,
	{ viewer }: { viewer: UserType },
): Promise<RouteType> => {
	const context = { viewer }
	const variables = {
		input: {
			title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
			...input,
		},
	}
	const result = await request(createRouteMutation, { variables, context })
	return result.data.createRoute
}
