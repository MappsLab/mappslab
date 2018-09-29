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

export default withDefaultMutation(mutation)
