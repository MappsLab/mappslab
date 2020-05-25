import { NodeType } from '../../types-ts'

export type SearchForList = (arg0: any) => Promise<void> | void

export type ListItemHandler<T extends NodeType> = (
	item: T,
) => void | Promise<void>

export type CreateNewFn = (str: string) => void | Promise<void>

export interface ListItem {
	key: string
	node: NodeType
	info: Array<string>
	onClick: () => void | Promise<void>
}

export interface ListOfTypeProps<Type extends NodeType> {
	title: string
	items?: Type[]
	viewerCanAdd: boolean
	update?: (node: NodeType) => void | Promise<void>
	onItemClick?: ListItemHandler<Type>
	onSearchResultClick?: ListItemHandler<Type>
	create?: (args: any) => Promise<void> | void
	remove?: (args: any) => Promise<void> | void
}

export const nodeToListItem = <T extends NodeType>(
	node: T,
	handler: ListItemHandler<T>,
): ListItem => {
	const { uid } = node
	return {
		key: uid,
		node,
		info: [],
		onClick: () => handler(node),
	}
}
