import gql from 'graphql-tag'
import { Map } from '../../types-ts'

export const createMapMutation = gql`
	mutation CreateMap($input: CreateMapInput!) {
		createMap(input: $input) {
			title
			uid
			slug
			description
			classroom {
				uid
				title
				slug
				description
				teachers {
					edges {
						node {
							uid
							name
							roles
						}
					}
				}
			}
		}
	}
`

export interface CreateMapResponse {
	updateMap: Map
}
