import gql from 'graphql-tag'
import { Route } from '../../types-ts'

export const updateRouteMutation = gql`
	mutation UpdateRoute(
		$uid: String!
		$title: String
		$description: String
		$image: Upload
		$video: String
	) {
		updateRoute(
			input: {
				uid: $uid
				description: $description
				title: $title
				image: $image
				video: $video
			}
		) {
			uid
			title
			description
			image {
				uid
				original {
					uri
					width
					height
					format
				}
				sizes {
					uri
					width
					height
					format
				}
			}
		}
	}
`

export interface UpdateRouteMutation {
	updateRoute: Route
}
