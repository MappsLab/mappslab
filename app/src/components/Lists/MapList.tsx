import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/react-hooks'
import { Map } from '../../types-ts'
import { mapsQuery, MapsQueryResponse } from '../../queries/Map'
import { List } from './List'
import { ListOfTypeBaseProps } from './utils'

const { useState } = React

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
}: ListOfTypeBaseProps<Map>) => {
	const { loading, data, refetch } = useQuery<MapsQueryResponse>(mapsQuery)

	const [showResults, setShowResults] = useState(false)

	const search = (searchValue: string) => {
		if (searchValue.length < 3) {
			setShowResults(false)
		} else {
			setShowResults(true)
			refetch({
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

	const [maps] = unwindEdges(data?.maps)

	return (
		<List
			title={title}
			search={search}
			searchResults={maps}
			onSearchResultClick={update}
			viewerCanAdd={viewerCanAdd}
			type="Map"
			items={items}
			create={create}
			onItemClick={onItemClick}
		/>
	)
}
