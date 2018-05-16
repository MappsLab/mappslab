// @flow

/**
 * CHORE
 * Make sure these are up to date.
 * Do a search for "implements Node", and make sure all use cases
 * are covered here.
 */

const coreQueryResolvers = {
	Node: {
		__resolveType(obj: { type?: string }): string | null {
			if (obj.type) return obj.type
			return null
		},
	},

	Edge: {
		__resolveType(obj: { edge: { type?: string } }): string | null {
			if (obj.edge.type) return `${obj.edge.type.toUpperCase()}Edge`
			return null
		},
	},

	Connection: {
		__resolveType(obj: { edges: Array<{ type?: string }> }): string | null {
			if (obj.edges[0] && obj.edges[0].type) {
				return `${obj.edges[0].type.toUpperCase()}Connection`
			}
			return null
		},
	},
}

export default coreQueryResolvers
