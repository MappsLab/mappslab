import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { Map, QueryMapsArgs } from '../../types-ts'

export const mapsQuery = gql`
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

export interface MapsResponse {
	maps: Paginated<Pick<Map, 'uid' | 'title' | '__typename'>>
}

export type MapsInput = QueryMapsArgs['input']
