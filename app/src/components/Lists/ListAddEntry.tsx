import React, { ChangeEvent } from 'react'
import { NodeType } from '../../types-ts'
import { Header5 } from 'Components/Text'
import {
	nodeToListItem,
	SearchForList,
	ListItemHandler,
	CreateNewFn,
} from './utils'
import { getNodeTitle } from '../../utils'
import { ListItem } from './ListItem'
import {
	AddButton,
	LineWrapper,
	SearchLabel,
	SearchInput,
	ListItems,
	ListItemWrapper,
} from './styled'

const { useState, useEffect, useRef, useLayoutEffect } = React

/**
 * ListAddEntry
 */

interface Props<T extends NodeType> {
	addLabel: string
	type: string
	searchName: string
	search: SearchForList
	create: CreateNewFn
	searchResults?: T[]
	onSearchResultClick: ListItemHandler<T>
}

export const ListAddEntry = <T extends NodeType>({
	addLabel,
	searchName,
	search,
	type,
	searchResults,
	onSearchResultClick,
	create,
}: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

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

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const onCreateClick = async () => {
		await create(inputValue)
		reset()
	}
	const label = addLabel || `Add new ${searchName}`

	return !isOpen ? (
		<LineWrapper>
			<AddButton
				level="tertiary"
				onClick={startSearch}
				data-testid="list-addButton"
			>
				+ {label}
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
						searchResultItems.map((item) => {
							const label = getNodeTitle(item.node)
							if (!label)
								throw new Error('This node does not have a name or title')
							return <ListItem key={item.key} {...item} />
						})
					) : (
						<ListItemWrapper>
							<Header5 align="center" fontStyle="italic" color="middleGray">
								{`No results for "${inputValue}"`}
							</Header5>
						</ListItemWrapper>
					)}
				</ListItems>
			)}
			{inputValue.length > 2 && (
				<LineWrapper>
					<AddButton
						data-testid="list-createButton"
						level="tertiary"
						onClick={onCreateClick}
					>
						{`+ Create new ${type} "${inputValue}"`}
					</AddButton>
				</LineWrapper>
			)}
		</React.Fragment>
	)
}

ListAddEntry.defaultProps = {
	searchResults: [],
}
