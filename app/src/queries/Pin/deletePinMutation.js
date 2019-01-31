// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation deletePin($uid: String!) {
		deletePin(input: { uid: $uid }) {
			success
		}
	}
`

const defaultOptions = (props) => {
	console.log(props)
	return {
		variables: {
			uid: props.pin.uid,
		},
		update: (cache, { data }) => {
			console.log('!!!')
			console.log(props)

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

export default withDefaultMutation(mutation, defaultOptions)
