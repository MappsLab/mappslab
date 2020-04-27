import gql from 'graphql-tag'
import { User } from '../../types-ts'

export const createStudentMutation = gql`
	mutation createStudent($input: CreateStudentInput!) {
		createStudent(input: $input) {
			uid
			name
			roles
		}
	}
`

export interface CreateStudentMutationResponse {
	createStudent: User
}
