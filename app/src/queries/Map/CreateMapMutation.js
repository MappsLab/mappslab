// @flow
import gql from 'graphql-tag'
import type { MapType } from 'Types/Map'
import { withDefaultMutation } from '../Mutation'
import type { MutationWrapper } from '../Mutation'

const mutation = gql`
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

type Response = {
	updateMap: MapType,
}

const CreateMapMutation: MutationWrapper<Response> = withDefaultMutation(mutation)

export default CreateMapMutation
