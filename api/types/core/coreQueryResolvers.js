// @flow

/**
 * CHORE
 * Make sure these are up to date.
 * Do a search for "implements Node", and make sure all use cases
 * are covered here.
 */

const coreQueryResolvers = {
	Node: {
		__resolveType(obj, context, info) {
			if (obj.username) return 'User'
			if (obj.publicId) return 'CloudinaryImage'
			if (obj.url) return 'UrlImage'
			return null
		},
	},

	ListPage: {
		__resolveType(obj) {
			if (obj.edges[0].username) return 'UsersList'
			return null
		},
	},

	Edge: {
		__resolveType(obj) {
			if (obj.edge.username) return 'UserEdge'
			return null
		},
	},
}

export default coreQueryResolvers
