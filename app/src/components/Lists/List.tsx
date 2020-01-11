import * as React from 'react'
import { Node } from '../../types-ts'
import ItemIcon from 'Components/ItemIcon'
import { ListAddEntry } from './ListAddEntry'
import { ButtonConfig } from './ButtonDropdown'
import { ListItem } from './ListItem'
import { ListTitle, ListWrapper, ListItems } from './styled'
import {
	CreateNewFn,
	SearchForList,
	nodeToListItem,
	ListItemHandler,
} from './utils'

/**
 * List
 */

interface Props<NodeType extends Node> {
	items: NodeType[]
	title: string
	type: string
	viewerCanAdd?: boolean
	addLabel?: string
	search?: SearchForList
	create?: CreateNewFn
	onSearchResultClick?: ListItemHandler
	searchResults?: NodeType[]
	onItemClick?: ListItemHandler
	buttons?: ButtonConfig<NodeType>[]
}

const defaultAddLabel = 'Add'
const defaultOnItemClick = async () => {}

export const List = <NodeType extends Node>({
	items,
	title,
	type,
	onItemClick,
	viewerCanAdd,
	addLabel,
	search,
	create,
	onSearchResultClick,
	searchResults,
	buttons,
}: Props<NodeType>) => {
	const itemToListItem = (node: NodeType) =>
		nodeToListItem(node, onItemClick || defaultOnItemClick)
	if (viewerCanAdd && (!search || !onSearchResultClick || !create))
		throw new Error(
			'You must provide `search`, `onSearchResultClick`, and `create` functions',
		)
	return (
		<ListWrapper>
			<ListTitle>
				<ItemIcon type={type} />
				{title}
			</ListTitle>
			<ListItems>
				{items.map(itemToListItem).map((item) => (
					<ListItem key={item.key} {...item} buttons={buttons} />
				))}
			</ListItems>
			{viewerCanAdd && search && onSearchResultClick && create && (
				<ListAddEntry
					search={search}
					type={type}
					create={create}
					searchResults={searchResults}
					onSearchResultClick={onSearchResultClick}
					searchName={type.replace(/s$/, '')}
					addLabel={addLabel || defaultAddLabel}
				/>
			)}
		</ListWrapper>
	)
}

List.defaultProps = {
	viewerCanAdd: false,
	addLabel: defaultAddLabel,
	search: undefined,
	create: undefined,
	onSearchResultClick: undefined,
	searchResults: [],
	onItemClick: async () => {},
}
