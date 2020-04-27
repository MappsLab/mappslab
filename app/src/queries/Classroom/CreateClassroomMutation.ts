import gql from 'graphql-tag'
import { Classroom } from '../../types-ts'

export const createClassroomMutation = gql`
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

export interface CreateClassroomResponse {
	classroom: Classroom
}
