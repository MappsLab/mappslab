import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Paginated } from '@good-idea/unwind-edges'
import { User, Classroom } from '../../types-ts'

const adminQuery = gql`
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

interface Response {
	teachers: Paginated<User>
	classrooms: Paginated<Classroom>
}

export const useAdminQuery = () => useQuery<Response>(adminQuery)
