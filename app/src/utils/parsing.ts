import { NodeType } from '../types-ts'

export const getNodeTitle = (node: NodeType): string | null | undefined => {
	switch (node.__typename) {
		case 'User':
			return node.name
		case 'Classroom':
		case 'DataLayer':
		case 'Map':
			return node.title
		default:
			// @ts-ignore
			throw new Error(`Could not get title for node type "${node.__typename}"`)
	}
}
