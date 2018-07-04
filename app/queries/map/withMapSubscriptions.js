// @flow
import gql from 'graphql-tag'
import withSubscription from '../withSubscription'

export const query = gql`
	subscription pinAddedToMap($mapUid: String!) {
		pinAddedToMap(input: { mapUid: $mapUid }) {
			uid
			title
			lat
			lang
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

const config = {
	options: (props) => ({
		variables: { mapUid: props.uid },
	}),
}

export const withPinAddedToMapSubscription = withSubscription(query, config)
