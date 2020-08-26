import gql from 'graphql-tag'
import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { Map } from '../../types-ts'
import { mapFragment } from './fragments'

export const mapQuery = gql`
	query MapQuery($uid: String!) {
		map(input: { uid: $uid }) {
			...MapFragment
		}
	}
	${mapFragment}
`

export interface MapResponse {
	map: Map
}

interface Variables {
	uid?: string | null
}

export const useMapQuery = (
	options: QueryHookOptions<MapResponse, Variables>,
) => useQuery<MapResponse, Variables>(mapQuery, options)
