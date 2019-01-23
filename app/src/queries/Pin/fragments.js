// @flow
import gql from 'graphql-tag'

export const pinFragment = gql`
	fragment PinFragment on Pin {
		uid
		title
		lat
		lng
		draft
		owner {
			uid
			name
			roles
		}
	}
`
