import { request } from './utils/db'
import { getDBRoutes } from './utils/route'

let routes

beforeAll(async (done) => {
	routes = await getDBRoutes()
	done()
})

describe('queries', () => {
	it('[route] should fetch a route by uid', async () => {
		const query = /* GraphQL */ `
			query Route($uid: String!) {
				route(input: { uid: $uid }) {
					uid
					title
				}
			}
		`
		const variables = { uid: routes[0].uid }
		const result = await request(query, { variables })

		expect(result.data.route.title).toBe(routes[0].title)
	})

	it('[route] should return route connections', async () => {
		const query = /* GraphQL */ `
			query Route($uid: String!) {
				route(input: { uid: $uid }) {
					uid
					title
					owner {
						uid
						name
					}
					pins {
						edges {
							node {
								uid
								title
							}
						}
					}
					# maps {
					# 	edges {
					# 		node {
					# 			uid
					# 			title
					# 		}
					# 	}
					# }
				}
			}
		`
		const variables = { uid: routes[1].uid }
		const result = await request(query, { variables })
		const { owner, pins } = result.data.route
		expect(pins.edges.length).toBeGreaterThan(0)
		expect(owner.uid).toBeTruthy()
	})

	it('[routes] should fetch a list of routes', async () => {
		const query = /* GraphQL */ `
			query Routes {
				routes {
					edges {
						node {
							uid
							title
						}
					}
				}
			}
		`
		const result = await request(query)

		routes.slice(0, 10).forEach((dbRoute, index) => {
			expect(result.data.routes.edges[index].node.uid).toBe(dbRoute.uid)
			expect(result.data.routes.edges[index].node.title).toBe(dbRoute.title)
		})
	})
})
