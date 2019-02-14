// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation UpdateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
			uid
			name
			roles
		}
	}
`

const UpdateUserMutation = withDefaultMutation(mutation)

export default UpdateUserMutation
