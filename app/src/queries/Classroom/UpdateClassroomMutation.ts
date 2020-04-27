// @flow
import gql from 'graphql-tag'
import { Classroom } from '../../types-ts'

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

export interface UpdateClassroomResponse {
	updateClassroom: Classroom
}
