// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header2 } from 'Components/Text'
import type { ClassroomType, UserType, MapType } from 'Types'
import ItemIcon from 'Components/ItemIcon'
import ListAddEntry from './ListAddEntry'
import ListItem from './ListItem'
import type { SearchForList, ListItemHandler } from './utils'
import { nodeToListItem } from './utils'

const ListTitle = styled(Header2)`
	${({ theme }) => `
		color: ${theme.color.primary.light}
	`}
`

const ListWrapper = styled.div`
	${({ theme }) => `
		margin-top: ${theme.layout.spacing.quadruple};
	`}
`

/**
 * List
 */

type Props = {
	items: Array<ClassroomType | UserType | MapType>,
	title: string,
	type: string,
	viewerCanAdd?: boolean,
	addLabel?: string,
	search?: SearchForList,
	onSearchResultClick?: ListItemHandler,
	searchResults?: Array<ClassroomType | UserType | MapType>,
	onItemClick: ListItemHandler,
}

const defaultAddLabel = 'Add'

export const List = ({
	items,
	title,
	type,
	onItemClick,
	viewerCanAdd,
	addLabel,
	search,
	onSearchResultClick,
	searchResults,
}: Props) => {
	const itemToListItem = (node) => nodeToListItem(node, onItemClick)
	if (viewerCanAdd && (!search || !onSearchResultClick))
		throw new Error('You must provide `search` and `onSearchResultClick` functions')
	return (
		<ListWrapper>
			<ListTitle>
				<ItemIcon type={type} />
				{title}
			</ListTitle>
			{items.map(itemToListItem).map((item) => (
				<ListItem key={item.node.uid} {...item} />
			))}
			{viewerCanAdd && search && onSearchResultClick && (
				<ListAddEntry
					search={search}
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
	onSearchResultClick: undefined,
	searchResults: [],
}

export default List

// export default (baseProps: BaseProps) => (
// 	<InspectorConsumer>{({ inspectItem }) => <List {...baseProps} inspectItem={inspectItem} />}</InspectorConsumer>
// )
