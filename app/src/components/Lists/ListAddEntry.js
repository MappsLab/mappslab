// @flow
import * as React from 'react'
import type { Node } from 'Types'
import { Header5 } from 'Components/Text'
import type { SearchForList, ListItemHandler, CreateNewFn } from './utils'
import { nodeToListItem } from './utils'
import ListItem from './ListItem'
import { AddButton, LineWrapper, SearchLabel, SearchInput, ListItems, ListItemWrapper } from './styled'

const { useState, useEffect, useRef, useLayoutEffect } = React

/**
 * ListAddEntry
 */

type Props = {
	addLabel: string,
	type: string,
	searchName: string,
	search: SearchForList,
	create: CreateNewFn,
	searchResults?: Array<Node>,
	onSearchResultClick: ListItemHandler,
}

const ListAddEntry = ({ addLabel, searchName, search, type, searchResults, onSearchResultClick, create }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef(null)

	const reset = () => {
		setIsOpen(false)
		setInputValue('')
	}

	const startSearch = () => {
		setInputValue('')
		setIsOpen(true)
	}

	const searchResultItems = searchResults
		? searchResults.map((node) =>
				nodeToListItem(node, async () => {
					await onSearchResultClick(node)
					reset()
				}),
		  )
		: []

	useEffect(() => {
		if (inputValue.length) {
			search(inputValue)
		}
	}, [inputValue])

	useLayoutEffect(() => {
		if (isOpen && inputRef && inputRef.current) inputRef.current.focus()
	})

	const onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const onCreateClick = async () => {
		await create(inputValue)
		reset()
	}

	return !isOpen ? (
		<LineWrapper>
			<AddButton level="tertiary" onClick={startSearch} data-testid="list-addButton">
				+ {addLabel || `Add new ${searchName}`}
			</AddButton>
		</LineWrapper>
	) : (
		<React.Fragment>
			<LineWrapper>
				<SearchLabel htmlFor="searchInput">
					+
					<SearchInput
						// onBlur={endSearch}
						ref={inputRef}
						id="searchInput"
						name="searchInput"
						value={inputValue}
						onChange={onInputChange}
						autoComplete="off"
					/>
				</SearchLabel>
			</LineWrapper>
			{inputValue.length > 2 && (
				<ListItems>
					{searchResultItems && searchResultItems.length ? (
						searchResultItems.map((item) => <ListItem key={item.key} {...item} title={`add ${item.title || item.name}`} />)
					) : (
						<ListItemWrapper align="center" visible={isOpen}>
							<Header5 align="center" fontStyle="italic" color="middleGray">
								{`No results for "${inputValue}"`}
							</Header5>
						</ListItemWrapper>
					)}
				</ListItems>
			)}
			{inputValue.length > 2 && (
				<LineWrapper align="center" visible={isOpen}>
					<AddButton
						data-testid="list-createButton"
						level="tertiary"
						onClick={onCreateClick}
					>{`+ Create new ${type} "${inputValue}"`}</AddButton>
				</LineWrapper>
			)}
		</React.Fragment>
	)
}

ListAddEntry.defaultProps = {
	searchResults: [],
}

export default ListAddEntry
