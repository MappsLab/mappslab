/**
 * CHORE
 * Make sure these are up to date.
 * Do a search for "implements Node", and make sure all use cases
 * are covered here.
 */

const typeNames = new Map([
	['image', 'Image'],
	['video', 'Video'],
	['user', 'User'],
	['mission', 'Mission'],
	['experience', 'Experience'],
	['story', 'Story'],
	['discussion', 'Discussion'],
])

const typeResolvers = {
	Node: {
		__resolveType(obj) {
			return typeNames.get(obj.__typename) || null
		},
	},

	Edge: {
		__resolveType(obj) {
			if (obj.edge.type) return `${obj.edge.type.toUpperCase()}Edge`
			return null
		},
	},

	Connection: {
		__resolveType(obj) {
			if (obj.edges[0] && obj.edges[0].type) {
				return `${obj.edges[0].type.toUpperCase()}Connection`
			}
			return null
		},
	},

	LoginResult: {
		__resolveType(obj) {
			if (obj.resetToken) return 'RequiresReset'
			return 'LoginSuccess'
		},
	},
}

export default typeResolvers
