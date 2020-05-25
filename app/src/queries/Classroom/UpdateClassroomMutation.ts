import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Classroom, MutationUpdateClassroomArgs } from '../../types-ts'
import { classroomQuery } from './classroomQuery'

const updateClassroomMutation = gql`
	mutation UpdateClassroom($input: UpdateClassroomInput!) {
		updateClassroom(input: $input) {
			uid
			description
			teachers {
				pageInfo {
					hasNextPage
					hasPrevPage
				}
				edges {
					node {
						uid
						name
					}
				}
			}
			students {
				pageInfo {
					hasNextPage
					hasPrevPage
				}
				edges {
					node {
						uid
						name
					}
				}
			}
		}
	}
`

interface Response {
	updateClassroom: Classroom
}

type Variables = MutationUpdateClassroomArgs['input']

const getOptions = (classroomUid: string) => ({
	refetchQueries: [{ query: classroomQuery, variables: { uid: classroomUid } }],
})

export const useUpdateClassroomMutation = (classroomUid: string) =>
	useMutation<Response, Variables>(
		updateClassroomMutation,
		getOptions(classroomUid),
	)
