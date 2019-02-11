// @flow
import gql from 'graphql-tag'
import type { ClassroomType } from 'Types/Classroom'
import { withDefaultMutation } from '../Mutation'
import type { MutationWrapper } from '../Mutation'

const mutation = gql`
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

type Response = {
	updateClassroom: ClassroomType,
}

const UpdateClassroomMutation: MutationWrapper<Response> = withDefaultMutation(mutation)

export default UpdateClassroomMutation
