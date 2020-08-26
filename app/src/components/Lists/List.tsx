import * as React from 'react'
import { NodeType } from '../../types-ts'
import { ItemIcon } from '../ItemIcon'
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
import { definitely } from '../../utils'

/**
 * List
 */

interface Props<T extends NodeType> {
	items?: T[]
	title: string
	type: string
	viewerCanAdd?: boolean
	addLabel?: string
	search?: SearchForList
	create?: CreateNewFn
	onSearchResultClick?: ListItemHandler<T>
	searchResults?: T[]
	onItemClick?: ListItemHandler<T>
	buttons?: ButtonConfig<T>[]
}

const defaultAddLabel = 'Add'
const defaultOnItemClick = async () => undefined

export const List = <T extends NodeType>({
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
}: Props<T>) => {
	const itemToListItem = (node: T) =>
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
				{definitely(items)
					.map(itemToListItem)
					.map((item) => (
						<ListItem {...item} key={item.key} buttons={buttons} />
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
	onItemClick: async () => undefined,
}
