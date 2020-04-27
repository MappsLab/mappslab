import gql from 'graphql-tag'
import { Pin } from '../../types-ts'

export const createPinMutation = gql`
	mutation createPin($input: NewPinInput!) {
		createPin(input: $input) {
			uid
			title
			lat
			lng
			owner {
				uid
				name
				roles
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

export interface CreatePinResponse {
	createPin: Pin
}
