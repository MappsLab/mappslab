import { NodeType } from '../types-ts'

export const getNodeTitle = (node: NodeType): string | null | undefined => {
	switch (node.__typename) {
		case 'User':
			return node.name
		case 'Map':
			return node.title
		case 'Classroom':
			return node.title
		default:
			return null
	}
}
