import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
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

export const useMapQuery = (variables: Variables) =>
	useQuery<MapResponse, Variables>(mapQuery, {
		variables,
		skip: !Boolean(variables.uid),
	})
