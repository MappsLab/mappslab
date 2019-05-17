import { Node, Variables } from 'Types'

export type SearchForList = (arg0: any) => Promise<void> | void

export type ListItemHandler = (item: Node) => void | Promise<void>

export type CreateNewFn = (str: string) => void | Promise<void>

export interface ListItem {
	key: string
	node: Node
	info: Array<string>
	onClick: () => void | Promise<void>
}

export interface ListOfTypeBaseProps<Type> {
	title: string
	items: Array<Type>
	viewerCanAdd: boolean
	update: (Type) => void | Promise<void>
	onItemClick: ListItemHandler
	create: (any) => Promise<void> | void
}

export interface ListOfTypeProps<Type> extends ListOfTypeBaseProps<Type> {
	searchQuery: (Variables) => Promise<void>
	searchResults: Array<Type>
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
