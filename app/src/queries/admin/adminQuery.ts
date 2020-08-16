import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { User, Classroom } from '../../types-ts'

export const adminQuery = gql`
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

export interface AdminQueryResponse {
	teachers: Paginated<User>
	classrooms: Paginated<Classroom>
}
