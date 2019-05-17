import gql from 'graphql-tag'
import { Map } from '../../types-ts'
import { QueryWrapper, withDefaultQuery } from '../Query'
import { mapFragment } from './fragments'

export const query = gql/* GraphQL */ `
	query MapQuery($uid: String!) {
		map(input: { uid: $uid }) {
			...MapFragment
		}
	}
	${mapFragment}
`

export type MapResponse = {
	map: Map,
}

const MapQuery: QueryWrapper<MapResponse> = withDefaultQuery(query)

export default MapQuery
