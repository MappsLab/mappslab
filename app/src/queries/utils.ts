import * as R from 'ramda'

type LoadingState =
	| 'loading'
	| 'refetching'
	| 'passivelyRefetching'
	| 'fetchingMore'
	| 'ready'
	| 'errors'

type Node = {
	cursor: string
	node: any
}

type withEdges = {
	edges: Array<Node>
	pageInfo?: {
		hasNextPage: boolean
		hasPrevPage: boolean
		cursor: string
	}
}

const splitEdges = (obj: withEdges) => ({
	edges: obj.edges.map(({ cursor, node }) => ({ __cursor: cursor, ...node })),
	pageInfo: obj.pageInfo || {},
})

export const getNetworkStatus = (num: number | void): LoadingState => {
	switch (num) {
		case undefined:
		case 1:
			return 'loading'
		case 4:
			return 'refetching'
		case 2:
		case 6:
			return 'passivelyRefetching'
		case 3:
			return 'fetchingMore'
		case 7:
			return 'ready'
		case 8:
			return 'errors'
		default:
			throw new Error(`Status number ${num} is not a valid network status`)
	}
}
