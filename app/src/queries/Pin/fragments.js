// @flow
import gql from 'graphql-tag'

export const pinFragment = gql`
	fragment PinFragment on Pin {
		uid
		title
		lat
		lng
		draft
		route {
			route {
				uid
			}
			isFirst
			isLast
		}
		owner {
			uid
			name
			roles
		}
	}
`
