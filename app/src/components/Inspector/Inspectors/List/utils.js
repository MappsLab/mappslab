// @flow
import type { ClassroomType, UserType, MapType } from 'Types'
// import type { InspectorItem } from '../../InspectorProvider'

type NodeArray = Array<ClassroomType | UserType | MapType>

export type SearchForList = (any) => Promise<NodeArray> | NodeArray

export type ListItemHandler = (ClassroomType | UserType | MapType) => void

export type ListItem = {
	node: ClassroomType | UserType | MapType,
	key: string,
	onClick: () => void,
}

// const nodeToInspectorItem = (item: ClassroomType | UserType | MapType): InspectorItem => ({
// 	uid: item.uid,
// 	type: item.__typename,
// 	title: item.__typename === 'User' ? item.name : item.title,
// })

export const nodeToListItem = (node: ClassroomType | UserType | MapType, handler: ListItemHandler): ListItem => {
	// $FlowFixMe TODO: make this detect types
	const { uid } = node
	return {
		key: uid,
		node,
		info: [],
		onClick: () => handler(node),
	}
}
