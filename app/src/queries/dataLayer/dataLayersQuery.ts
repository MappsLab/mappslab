import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { DataLayer, QueryDataLayersArgs } from '../../types-ts'

export const dataLayersQuery = gql`
	query DataLayersQuery(
		$first: Int
		$after: String
		$sort: DataLayerSortParameters
		$where: DataLayerWhereParameters
	) {
		dataLayers(
			input: { first: $first, after: $after, sort: $sort, where: $where }
		) {
			pageInfo {
				lastCursor
				hasNextPage
			}
			edges {
				node {
					uid
					title
					uri
				}
			}
		}
	}
`

export type DataLayersInput = QueryDataLayersArgs['input']

export interface DataLayersResponse {
	dataLayers: Paginated<DataLayer>
}
