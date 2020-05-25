import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { mapQuery } from '../map'
import { Pin, UpdatePinInput } from '../../types-ts'
import { pinFragment } from './fragments'

const updatePinMutation = gql`
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

interface UpdatePinMutationResponse {
	updatePin: Pin
}

export type UpdatePinVariables = UpdatePinInput

const getOptions = ({ mapUid }: Config) => ({
	refetchQueries: [{ query: mapQuery, variables: { uid: mapUid } }],
})

interface Config {
	mapUid: string
}

export const useUpdatePinMutation = (config: Config) =>
	useMutation<Response, UpdatePinVariables>(
		updatePinMutation,
		getOptions(config),
	)
