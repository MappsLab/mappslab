import gql from 'graphql-tag'
import { MutationFunctionOptions } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import { Pin, MutationDeletePinArgs } from '../../types-ts'

export const deletePinMutation = gql`
	mutation deletePin($uid: String!) {
		deletePin(input: { uid: $uid }) {
			uid
			success
		}
	}
`

interface DeletePinMutationOptionsProps {
	pin: Pin
}

type Variables = MutationDeletePinArgs['input']

const deletePinOptions: MutationFunctionOptions<Response, Variables> = {
	update: (cache, { data }) => {
		// Update the unfollowed user's data from the query
		if (data?.deletePin.success === true) {
			cache.writeFragment({
				id: data.deletePin.uid,
				fragment: gql`
					fragment deletedPin on Pin {
						deleted
					}
				`,
				data: {
					deleted: true,
					__typename: 'Pin',
				},
			})
		}
	},
}

interface Response {
	deletePin: {
		success: boolean
		uid: string
	}
}

export const useDeletePinMutation = () =>
	useMutation<Response, Variables>(deletePinMutation, deletePinOptions)
