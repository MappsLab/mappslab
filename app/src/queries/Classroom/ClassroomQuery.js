// @flow
import gql from 'graphql-tag'
import type { ClassroomType } from 'Types'
import { withDefaultQuery } from '../Query'
import type { QueryWrapper } from '../Query'

export const query = gql/* GraphQL */ `
	query ClassroomQuery($uid: String, $slug: String) {
		classroom(input: { uid: $uid, slug: $slug }) {
			title
			description
			uid
			slug
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

type ClassroomResponse = {
	classroom: ClassroomType,
}

const ClassroomQuery: QueryWrapper<ClassroomResponse> = withDefaultQuery(query)

export default ClassroomQuery
