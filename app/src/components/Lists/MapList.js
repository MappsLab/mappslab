// @flow
import * as React from 'react'
import type { MapType } from 'Types/Map'
import { MapsQuery } from 'Queries/Map'
import List from './List'
import type { ListOfTypeProps, ListOfTypeBaseProps } from './utils'

/**
 * MapList
 */

const MapList = ({ title, searchQuery, searchResults, items, viewerCanAdd, update, onItemClick }: ListOfTypeProps<MapType>) => {
	const search = (searchValue: string) => {
		searchQuery({
			where: {
				title: {
					contains: searchValue,
				},
			},
		})
	}

	return (
		<List
			title={title}
			search={search}
			searchResults={searchResults}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="Map"
			items={items}
			onItemClick={onItemClick}
		/>
	)
}

const MapListWrapper = (baseProps: ListOfTypeBaseProps<MapType>) => (
	<MapsQuery delayQuery>
		{({ data, refetch }) => <MapList searchQuery={refetch} searchResults={data ? data.maps : []} {...baseProps} />}
	</MapsQuery>
)

export default MapListWrapper
