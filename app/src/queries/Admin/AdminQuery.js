// @flow
import gql from 'graphql-tag'
import type { ClassroomType } from 'Types/Classroom'
import type { UserType } from 'Types/User'
import { withDefaultQuery } from '../Query'
import type { QueryWrapper } from '../Query'

export const query = gql/* GraphQL */ `
	query AdminQuery {
		teachers {
			edges {
				node {
					uid
					name
					roles
				}
			}
		}
		classrooms {
			edges {
				node {
					uid
					title
				}
			}
		}
	}
`

type ClassroomResponse = {
	teachers: Array<UserType>,
	classrooms: Array<ClassroomType>,
}

const AdminQuery: QueryWrapper<ClassroomResponse> = withDefaultQuery(query)

export default AdminQuery
