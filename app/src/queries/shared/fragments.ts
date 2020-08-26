import gql from 'graphql-tag'

export const imageFragment = gql`
	fragment ImageFragment on Image {
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
`
