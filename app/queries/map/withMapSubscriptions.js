// @flow
import gql from 'graphql-tag'

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
		}
	}
`
