import * as React from 'react'
import { Map } from 'Types'
import { unwindEdges } from '@good-idea/unwind-edges'
import { MapsQuery } from '../../queries/Map'
import { List } from './List'
import { ListOfTypeProps, ListOfTypeBaseProps } from './utils'

const { useState } = React

/**
 * MapList
 */

const MapListMain = ({
	title,
	searchQuery,
	searchResults,
	items,
	viewerCanAdd,
	update,
	onItemClick,
	create,
}: ListOfTypeProps<Map>) => {
	const [showResults, setShowResults] = useState(false)

	const search = (searchValue: string) => {
		if (searchValue.length < 3) {
			setShowResults(false)
		} else {
			setShowResults(true)
			searchQuery({
				input: {
					where: {
						title: {
							contains: searchValue,
						},
					},
				},
			})
		}
	}

	return (
		<List
			title={title}
			search={search}
			searchResults={showResults ? searchResults : []}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="Map"
			// $FlowFixMe
			items={items}
			create={create}
			onItemClick={onItemClick}
		/>
	)
}

export const MapList = (baseProps: ListOfTypeBaseProps<Map>) => (
	<MapsQuery delayQuery>
		{({ data, refetch }) => (
			<MapListMain
				searchQuery={refetch}
				searchResults={data && data.maps ? unwindEdges(data.maps)[0] || [] : []}
				{...baseProps}
			/>
		)}
	</MapsQuery>
)
