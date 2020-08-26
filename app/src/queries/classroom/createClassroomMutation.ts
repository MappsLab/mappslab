import gql from 'graphql-tag'
import { MutationHookOptions, useMutation } from '@apollo/client'
import { userQuery } from '../user'
import { Classroom, MutationCreateClassroomArgs } from '../../types-ts'

const createClassroomMutation = gql`
	mutation CreateClassroom($input: NewClassroomInput!) {
		createClassroom(input: $input) {
			title
			uid
			slug
			__typename
			teachers {
				pageInfo {
					lastCursor
				}
				edges {
					node {
						uid
						name
						roles
					}
				}
			}
			students {
				pageInfo {
					lastCursor
				}
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
`

type Variables = {
	input: MutationCreateClassroomArgs['input']
}

interface Response {
	classroom: Classroom
}

interface Config {
	userUid: string
}

const getOptions = ({
	userUid,
}: Config): MutationHookOptions<Response, Variables> => ({
	refetchQueries: [{ query: userQuery, variables: { uid: userUid } }],
})

export const useCreateClassroomMutation = (config: Config) =>
	useMutation<Response, Variables>(createClassroomMutation, getOptions(config))
