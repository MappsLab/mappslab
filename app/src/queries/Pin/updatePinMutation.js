// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation UpdatePin($uid: String!, $title: String, $description: String, $lat: Float, $lng: Float, $addToMaps: [String]) {
		updatePin(input: { uid: $uid, description: $description, title: $title, lat: $lat, lng: $lng, addToMaps: $addToMaps }) {
			uid
			title
			description
			lat
			lng
			draft
			owner {
				uid
				name
			}
		}
	}
`

export default withDefaultMutation(mutation)
