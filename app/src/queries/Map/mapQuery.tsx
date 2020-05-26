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

const skippable = (options: any): QueryResult<MapResponse, Variables> => {
	return {
		data: undefined,
		loading: false,
		// @ts-ignore
		called: false,
		networkStatus: 7,
	}
}

export const useMapQuery = (
	options: QueryHookOptions<MapResponse, Variables>,
) =>
	options.skip
		? skippable(options)
		: useQuery<MapResponse, Variables>(mapQuery, options)
