// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
	mutation createPin($title: String!, $description: String, $lat: Float!, $lng: Float!, $addToMaps: [String]) {
		createPin(input: { title: $title, description: $description, lat: $lat, lng: $lng, addToMaps: $addToMaps }) {
			uid
			title
			lat
			lng
			owner {
				uid
				name
			}
			maps {
				pageInfo {
					hasNextPage
					lastCursor
				}
				edges {
					cursor
					node {
						uid
						title
					}
				}
			}
		}
	}
`

export default withDefaultMutation(mutation)
