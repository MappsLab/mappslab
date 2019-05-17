// @flow

const Image = /* GraphQL */ `
	type Image implements Node {
		uid: String!
		sizes: [ImageSize]
		original: ImageSize
		tileset: Tileset
	}

	type ImageSize {
		format: String!
		uri: String!
		width: Int!
		height: Int!
		label: String
	}
`

export default Image
