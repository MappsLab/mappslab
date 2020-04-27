import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { DataLayer } from '../../types-ts'

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

export interface DataLayersQueryResponse {
	dataLayers: Paginated<DataLayer>
}
