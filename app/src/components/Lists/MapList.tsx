import * as React from 'react'
import { useLazyQuery } from '@apollo/client'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Map } from '../../types-ts'
import { MapsResponse, MapsInput, mapsQuery } from '../../queries/map'
import { List } from './List'
import { ListOfTypeProps } from './utils'

/**
 * MapList
 */

export const MapList = ({
	title,
	items,
	viewerCanAdd,
	update,
	onItemClick,
	create,
}: ListOfTypeProps<Map>) => {
	const [fetchMaps, { data }] = useLazyQuery<MapsResponse, MapsInput>(mapsQuery)

	const search = (searchValue: string) => {
		fetchMaps({
			variables: {
				where: {
					title: {
						contains: searchValue,
					},
				},
			},
		})
	}

	const [searchResults] = unwindEdges(data?.maps)

	return (
		<List
			title={title}
			search={search}
			searchResults={searchResults}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="Map"
			items={items}
			create={create}
			onItemClick={onItemClick}
		/>
	)
}
