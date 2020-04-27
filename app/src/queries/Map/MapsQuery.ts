import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { Map } from '../../types-ts'

export const mapsQuery = gql/* GraphQL */ `
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

export interface MapsQueryResponse {
	maps: Paginated<Map>
}

