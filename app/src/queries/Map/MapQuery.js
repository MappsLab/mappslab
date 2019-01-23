// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types/Map'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query MapQuery($uid: String!) {
		map(input: { uid: $uid }) {
			__typename
			title
			uid
			slug
			description
			classroom {
				uid
				__typename
				title
				slug
				description
				teachers {
					edges {
						node {
							__typename
							uid
							name
							roles
						}
					}
				}
			}
			pins {
				pageInfo {
					lastCursor
					hasNextPage
				}
				edges {
					node {
						uid
						__typename
						title
						lat
						lng
						draft
						owner {
							uid
							name
							roles
						}
					}
				}
			}
			routes {
				pageInfo {
					lastCursor
					hasNextPage
				}
				edges {
					cursor
					node {
						uid
						__typename
						title
						pins {
							edges {
								node {
									uid
									__typename
									title
									description
								}
							}
						}
					}
				}
			}
		}
	}
`

type MapResponse = {
	map: MapType,
}

const MapQuery: QueryWrapper<MapResponse> = withDefaultQuery(query)

export default MapQuery
