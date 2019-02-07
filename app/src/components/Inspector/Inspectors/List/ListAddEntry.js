// @flow
import * as React from 'react'
import { Button } from 'Components/Buttons'
import type { SearchForList, ListItemHandler, ListItem as ListItemType } from './utils'
import { nodeToListItem } from './utils'
import ListItem from './ListItem'

const { useState, useEffect } = React

/**
 * ListAddField
 */

type Props = {
	addLabel: string,
	searchName: string,
	search: SearchForList,
	onSearchResultClick: ListItemHandler,
}

const ListAddField = ({ addLabel, searchName, search, onSearchResultClick }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [searchResults, setSearchResults] = useState([])

	const reset = () => {
		setIsOpen(false)
		setInputValue('')
		setSearchResults([])
	}

	// const handleSearchResultClick = (item: ListItemType)

	const runSearch = async () => {
		if (inputValue.length) {
			const results = await search(inputValue)
			const items = results.map((node) =>
				nodeToListItem(node, () => {
					onSearchResultClick(node)
					reset()
				}),
			)
			if (items) setSearchResults(items)
		}
	}

	useEffect(() => {
		if (inputValue.length) runSearch()
	})

	const onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	if (!isOpen)
		return (
			<Button level="tertiary" onClick={() => setIsOpen(true)}>
				+ {addLabel}
			</Button>
		)
	return (
		<>
			<label htmlFor="searchInput">
				Search for a new {searchName}
				<input id="searchInput" name="searchInput" value={inputValue} onChange={onInputChange} />
			</label>
			{searchResults && searchResults.map((item) => <ListItem key={item.key} {...item} />)}
		</>
	)
}

export default ListAddField
