// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'
import { pinFragment } from './fragments'

const mutation = gql`
	mutation UpdatePin(
		$uid: String!
		$title: String
		$description: String
		$lat: Float
		$lng: Float
		$addToMaps: [String]
		$image: Upload
		$video: String
	) {
		updatePin(
			input: {
				uid: $uid
				description: $description
				title: $title
				lat: $lat
				lng: $lng
				addToMaps: $addToMaps
				image: $image
				video: $video
			}
		) {
			...PinFragment
		}
	}
	${pinFragment}
`

export default withDefaultMutation(mutation)
