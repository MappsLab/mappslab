// @flow
import type { Node, Variables } from 'Types'
// import type { InspectorItem } from '../../InspectorProvider'

// type NodeArray = Array<ClassroomType | UserType | MapType>

export type SearchForList = (any) => Promise<void> | void

export type ListItemHandler = (Node) => void

export type ListItem = {
	node: Node,
	onClick: () => void,
}

export type ListOfTypeBaseProps<Type> = {
	title: string,
	items: Array<Type>,
	viewerCanAdd: boolean,
	update: (Type) => void,
	onItemClick: ListItemHandler,
}

export type ListOfTypeProps<Type> = ListOfTypeBaseProps<Type> & {
	searchQuery: (Variables) => Promise<void>,
	searchResults: Array<Type>,
}

export const nodeToListItem = (node: Node, handler: ListItemHandler): ListItem => {
	// $FlowFixMe TODO: make this detect types
	const { uid } = node
	return {
		key: uid,
		node,
		info: [],
		onClick: () => handler(node),
	}
}
