// @flow
import gql from 'graphql-tag'

export const pinFragment = gql`
	fragment PinFragment on Pin {
		uid
		title
		lat
		lng
		draft
		routes {
			edges {
				node {
					uid
				}
			}
		}
		owner {
			uid
			name
			roles
		}
	}
`
