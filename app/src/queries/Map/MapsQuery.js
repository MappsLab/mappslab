// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types/Map'
import type { QueryWrapper } from '../Query'
import { withDefaultQuery } from '../Query'

const query = gql/* GraphQL */ `
	query MapsQuery($input: MapListOptions) {
		maps(input: $input) {
			pageInfo {
				hasNextPage
				hasPrevPage
				lastCursor
			}
			edges {
				node {
					uid
					title
				}
			}
		}
	}
`

type UsersResponse = {
	users: Array<MapType>,
}

const UsersQuery: QueryWrapper<UsersResponse> = withDefaultQuery(query)

export default UsersQuery
