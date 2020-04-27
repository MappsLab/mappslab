import gql from 'graphql-tag'
import { User } from '../../types-ts'

export const updateUserMutation = gql`
	mutation UpdateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
			uid
			name
			roles
		}
	}
`

export interface UpdateUserMutationResponse {
	updateUser: User
}
