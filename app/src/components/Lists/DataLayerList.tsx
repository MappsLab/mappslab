import * as React from 'react'
import { useLazyQuery } from '@apollo/client'
import { unwindEdges } from '@good-idea/unwind-edges'
import { DataLayer } from '../../types-ts'
import {
	dataLayersQuery,
	DataLayersInput,
	DataLayersResponse,
} from '../../queries/dataLayer'
import { ListOfTypeProps } from './utils'
import { List } from './List'
import { definitely } from '../../utils'

/**
 * DataLayerList
 */

export const DataLayerList = ({
	title,
	viewerCanAdd,
	onItemClick,
	onSearchResultClick,
	create,
	remove,
	items,
}: ListOfTypeProps<DataLayer>) => {
	const [fetchDataLayers, { data }] = useLazyQuery<
		DataLayersResponse,
		DataLayersInput
	>(dataLayersQuery)

	const [searchResults] = unwindEdges(data?.dataLayers)
	const buttons = definitely([
		remove
			? {
					label: 'Remove',
					handler: (dataLayer: DataLayer) => remove(dataLayer),
			  }
			: null,
	])

	const search = (searchValue: string) => {
		if (searchValue.length < 3) return
		fetchDataLayers({
			variables: {
				where: {
					title: {
						contains: searchValue,
					},
				},
			},
		})
	}

	const handleSearchResultClick = (result: DataLayer) => {
		console.log(onSearchResultClick, result)
		if (onSearchResultClick) onSearchResultClick(result)
	}

	return (
		<List<DataLayer>
			search={search}
			create={create}
			searchResults={searchResults}
			onSearchResultClick={handleSearchResultClick}
			title={title}
			items={items || []}
			type="dataLayer"
			viewerCanAdd={viewerCanAdd}
			buttons={buttons}
		/>
	)
}
