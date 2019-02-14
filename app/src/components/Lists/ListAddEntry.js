// @flow
import * as React from 'react'
import { Button } from 'Components/Buttons'
import type { Node } from 'Types'
import type { SearchForList, ListItemHandler, CreateNewFn } from './utils'
import { nodeToListItem } from './utils'
import ListItem from './ListItem'

const { useState, useEffect } = React

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

	const reset = () => {
		setIsOpen(false)
		setInputValue('')
	}

	const searchResultItems = searchResults
		? searchResults.map((node) =>
				nodeToListItem(node, () => {
					onSearchResultClick(node)
					reset()
				}),
		  )
		: []

	useEffect(() => {
		if (inputValue.length) {
			search(inputValue)
		}
	}, [inputValue])

	const onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const onCreateClick = async () => {
		await create(inputValue)
		reset()
	}

	if (!isOpen)
		return (
			<Button level="tertiary" onClick={() => setIsOpen(true)}>
				+ {addLabel}
			</Button>
		)
	return (
		<React.Fragment>
			<label htmlFor="searchInput">
				Search for a new {searchName}
				<input id="searchInput" name="searchInput" value={inputValue} onChange={onInputChange} />
			</label>
			{searchResultItems && searchResultItems.map((item) => <ListItem key={item.key} {...item} />)}
			{inputValue.length > 2 && <Button level="tertiary" onClick={onCreateClick}>{`Create new ${type} "${inputValue}"`}</Button>}
		</React.Fragment>
	)
}

ListAddEntry.defaultProps = {
	searchResults: [],
}

export default ListAddEntry
