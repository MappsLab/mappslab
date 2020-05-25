import gql from 'graphql-tag'
import { MutationFunctionOptions } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import { User, MutationUpdateUserArgs } from '../../types-ts'
import { userQuery } from './userQuery'

export const updateUserMutation = gql`
	mutation UpdateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
			uid
			name
			roles
		}
	}
`

type Variables = {
	input: MutationUpdateUserArgs['input']
}

interface Response {
	updateUser: User
}

const getOptions = ({ uid }): MutationFunctionOptions<Response, Variables> => ({
	refetchQueries: [{ query: userQuery, variables: { uid } }],
})

export const useUpdateUserMutation = (userUid: string) =>
	useMutation<Response, Variables>(
		updateUserMutation,
		getOptions({ uid: userUid }),
	)
