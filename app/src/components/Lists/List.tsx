import * as React from 'react'
import { Node } from 'Types'
import ItemIcon from 'Components/ItemIcon'
import { ListAddEntry } from './ListAddEntry'
import { ListItem } from './ListItem'
import { ListTitle, ListWrapper, ListItems } from './styled'
import { CreateNewFn, SearchForList, ListItemHandler } from './utils'
import { nodeToListItem } from './utils'

/**
 * List
 */

type Props = {
	items: Node[]
	title: string
	type: string
	viewerCanAdd?: boolean
	addLabel?: string
	search?: SearchForList
	create?: CreateNewFn
	onSearchResultClick?: ListItemHandler
	searchResults?: Node[]
	onItemClick?: ListItemHandler
}

const defaultAddLabel = 'Add'
const defaultOnItemClick = async () => {}

export const List = ({
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
}: Props) => {
	const itemToListItem = (node) => nodeToListItem(node, onItemClick || defaultOnItemClick)
	if (viewerCanAdd && (!search || !onSearchResultClick || !create))
		throw new Error('You must provide `search`, `onSearchResultClick`, and `create` functions')
	return (
		<ListWrapper>
			<ListTitle>
				<ItemIcon type={type} />
				{title}
			</ListTitle>
			<ListItems>
				{items.map(itemToListItem).map((item) => (
					<ListItem key={item.key} {...item} />
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
