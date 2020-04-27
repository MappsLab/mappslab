import gql from 'graphql-tag'
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

export interface MapQueryResponse {
	map: Map
}
