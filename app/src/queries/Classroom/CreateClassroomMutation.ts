import gql from 'graphql-tag'
import { MutationFunctionOptions } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import { userQuery } from '../user/userQuery'
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

const getOptions = ({ uid }): MutationFunctionOptions<Response, Variables> => ({
	refetchQueries: [{ query: userQuery, variables: { uid } }],
})

export const useCreateClassroomMutation = (userUid: string) =>
	useMutation<Response, Variables>(
		createClassroomMutation,
		getOptions({ uid: userUid }),
	)
