// @flow
import gql from 'graphql-tag'

export const pinFragment = gql`
	fragment PinFragment on Pin {
		uid
		title
		description
		lat
		lng
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
		video
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
`
