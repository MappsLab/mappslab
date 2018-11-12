// @flow
import gql from 'graphql-tag'
import type { ClassroomType } from 'Types'
import { withDefaultMutation } from '../Mutation'
import type { MutationWrapper } from '../Mutation'

const mutation = gql`
	mutation UpdateClassroom($uid: String!, $title: String, $description: String) {
		updateClassroom(input: { uid: $uid, title: $title, description: $description }) {
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
