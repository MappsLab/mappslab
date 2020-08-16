import gql from 'graphql-tag'
import { useMutation, MutationHookOptions } from '@apollo/client'
import { classroomQuery } from '../classroom'
import { Map, MutationCreateMapArgs } from '../../types-ts'

const createMapMutation = gql`
	mutation CreateMap(
		$title: String!
		$description: String
		$addToClassrooms: [String!]
	) {
		createMap(
			input: {
				title: $title
				description: $description
				addToClassrooms: $addToClassrooms
			}
		) {
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

interface GetOptionsConfig {
	classroomUid: string
}

const getOptions = ({
	classroomUid,
}: GetOptionsConfig): MutationHookOptions<Response, Variables> => ({
	refetchQueries: [{ query: classroomQuery, variables: { uid: classroomUid } }],
})

export const useCreateMapMutation = (config: GetOptionsConfig) =>
	useMutation<Response, Variables>(createMapMutation, getOptions(config))
