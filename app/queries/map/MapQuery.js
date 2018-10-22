// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types/Map'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

export const query = gql/* GraphQL */ `
	query MapQuery($uid: String!) {
		map(input: { uid: $uid }) {
			title
			uid
			slug
			pins {
				pageInfo {
					lastCursor
					hasNextPage
				}
				edges {
					node {
						uid
						title
						lat
						lng
						description
						owner {
							uid
							name
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
