import gql from 'graphql-tag'
import { MutationHookOptions, useMutation } from '@apollo/client'
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

const getOptions = ({ uid }): MutationHookOptions<Response, Variables> => ({
	refetchQueries: [{ query: userQuery, variables: { uid } }],
})

export const useUpdateUserMutation = (userUid: string) =>
	useMutation<Response, Variables>(
		updateUserMutation,
		getOptions({ uid: userUid }),
	)
