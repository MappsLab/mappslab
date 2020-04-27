import gql from 'graphql-tag'
import { User } from '../../types-ts'

export const createTeacherMutation = gql`
	mutation CreateTeacher($input: CreateTeacherInput!) {
		createTeacher(input: $input) {
			uid
			name
			roles
		}
	}
`

export interface CreateTeacerMutationResponse {
	createTeacher: User
}
