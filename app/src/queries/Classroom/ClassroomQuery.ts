import gql from 'graphql-tag'
import { Classroom } from '../../types-ts'

export const query = gql`
	query ClassroomQuery($uid: String, $slug: String) {
		classroom(input: { uid: $uid, slug: $slug }) {
			title
			description
			uid
			slug
			viewerIsTeacher
			teachers {
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
			maps {
				edges {
					node {
						uid
						title
					}
				}
			}
		}
	}
`

export interface ClassroomQueryResponse {
	classroom: Classroom
}
