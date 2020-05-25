import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Map, MutationCreateMapArgs } from '../../types-ts'

const createMapMutation = gql`
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

type Variables = MutationCreateMapArgs['input']

interface Response {
	updateMap: Map
}

export const useCreateMapMutation = () =>
	useMutation<Response, Variables>(createMapMutation)
