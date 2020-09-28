import gql from 'graphql-tag'
import { imageFragment } from '../shared/fragments'

export const pinFragment = gql`
	fragment PinFragment on Pin {
		uid
		title
		description
		lat
		lng
		route {
			route {
				__typename
				uid
				owner {
					uid
					name
				}
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
		imageUrl
		color
		image {
			...ImageFragment
		}
	}
	${imageFragment}
`
