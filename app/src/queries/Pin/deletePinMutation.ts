import gql from 'graphql-tag'
import { Pin } from '../../types-ts'

export const deletePinMutation = gql`
	mutation deletePin($uid: String!) {
		deletePin(input: { uid: $uid }) {
			success
		}
	}
`

interface DeletePinMutationOptionsProps {
	pin: Pin
}

export const deletePinMutationOptions = (
	props: DeletePinMutationOptionsProps,
) => {
	return {
		variables: {
			uid: props.pin.uid,
		},
		update: (cache, { data }) => {
			// Update the unfollowed user's data from the query
			if (data.deletePin.success === true) {
				cache.writeFragment({
					id: props.pin.uid,
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
}

export interface DeletePinMutationResponse {
	success: boolean
}
