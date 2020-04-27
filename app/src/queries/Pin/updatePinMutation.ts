import gql from 'graphql-tag'
import { Pin } from '../../types-ts'
import { pinFragment } from './fragments'

export const updatePinMutation = gql`
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

export interface UpdatePinMutationResponse {
	updatePin: Pin
}
