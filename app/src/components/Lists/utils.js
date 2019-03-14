// @flow
import type { Node } from 'Types'
import type { Variables } from 'Types/GraphQL'
// import type { InspectorItem } from '../../InspectorProvider'

// type NodeArray = Array<ClassroomType | UserType | MapType>

export type SearchForList = (any) => Promise<void> | void

export type ListItemHandler = (Node) => void | Promise<void>

export type CreateNewFn = (string) => void | Promise<void>

export type ListItem = {
	key: string,
	node: Node,
	info: Array<string>,
	onClick: () => void | Promise<void>,
}

export type ListOfTypeBaseProps<Type> = {
	title: string,
	items: Array<Type>,
	viewerCanAdd: boolean,
	update: (Type) => void | Promise<void>,
	onItemClick: ListItemHandler,
	create: (any) => Promise<void> | void,
}

export type ListOfTypeProps<Type> = ListOfTypeBaseProps<Type> & {
	searchQuery: (Variables) => Promise<void>,
	searchResults: Array<Type>,
}

export const nodeToListItem = (node: Node, handler: ListItemHandler): ListItem => {
	const { uid } = node
	return {
		key: uid,
		node,
		info: [],
		onClick: () => handler(node),
	}
}
