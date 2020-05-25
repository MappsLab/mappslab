import gql from 'graphql-tag'
import { useQuery, QueryHookOptions } from '@apollo/react-hooks'
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

interface Response {
	maps: Paginated<Pick<Map, 'uid' | 'title' | '__typename'>>
}

type Variables = QueryMapsArgs['input']

export const useMapsQuery = (options: QueryHookOptions<Response, Variables>) =>
	useQuery<Response, Variables>(mapsQuery, options)
