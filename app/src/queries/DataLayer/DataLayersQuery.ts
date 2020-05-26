import gql from 'graphql-tag'
import { useQuery, QueryHookOptions } from '@apollo/client'
import { Paginated } from '@good-idea/unwind-edges'
import { DataLayer, QueryDataLayersArgs } from '../../types-ts'

const dataLayersQuery = gql`
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

export type Variables = QueryDataLayersArgs['input']

interface Response {
	dataLayers: Paginated<DataLayer>
}

export const useDataLayersQuery = (
	options: QueryHookOptions<Response, Variables>,
) => useQuery<Response, Variables>(dataLayersQuery, options)
