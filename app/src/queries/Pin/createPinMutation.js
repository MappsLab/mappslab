// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from '../Mutation'

const mutation = gql`
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

export default withDefaultMutation(mutation)
