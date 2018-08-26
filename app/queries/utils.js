// @flow
import type { LoadingState } from 'Types/GraphQL'

type Node = {
	cursor: string,
	node: any,
}

type withEdges = {
	edges: Array<Node>,
	pageInfo?: {
		hasNextPage: boolean,
		hasPrevPage: boolean,
		cursor: string,
	},
}

const splitEdges = (obj: withEdges) => ({
	edges: obj.edges.map(({ cursor, node }) => ({ __cursor: cursor, ...node })),
	pageInfo: obj.pageInfo || {},
})

export const unwindEdges = (obj: any) =>
	typeof obj === 'object'
		? Object.entries(obj).reduce((acc, [key, value]) => {
				if (value && value.edges && Array.isArray(value.edges)) {
					// $FlowFixMe
					const { edges, pageInfo } = splitEdges(value)
					const pageInfoKey = `${key}PageInfo`
					return {
						[key]: edges.map(unwindEdges),
						[pageInfoKey]: pageInfo,
						...acc,
					}
				}
				const parsed =
					typeof value === 'object'
						? // unwind recursively if there are more values
						  Array.isArray(value)
							? // if it's an array, unwind each item as a new array
							  value.map(unwindEdges)
							: // otherwise, pass in the object as is
							  unwindEdges(value)
						: // otherwise, value is OK
						  value
				return {
					[key]: parsed,
					...acc,
				}
		  }, {})
		: obj

export const getNetworkStatus = (num: number): LoadingState => {
	switch (num) {
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
