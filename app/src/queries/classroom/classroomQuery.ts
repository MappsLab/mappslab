import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Classroom, QueryClassroomArgs } from '../../types-ts'

export const classroomQuery = gql`
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

type Variables = QueryClassroomArgs['input']

interface Response {
	classroom: Classroom
}

export const useClassroomQuery = (variables: Variables) =>
	useQuery<Response, Variables>(classroomQuery, { variables })
