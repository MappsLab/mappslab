import gql from 'graphql-tag'
// import { DataLayer } from '../../types-ts'
import { withDefaultQuery } from '../Query'

export const query = gql`
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

export const DataLayersQuery = withDefaultQuery(query)
