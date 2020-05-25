import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { DataLayer } from '../../types-ts'
import { useDataLayersQuery } from '../../queries/dataLayer'
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
	create,
	remove,
	items,
}: ListOfTypeProps<DataLayer>) => {
	const { data, refetch } = useDataLayersQuery({ skip: true })
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
		refetch({
			where: {
				title: {
					contains: searchValue,
				},
			},
		})
	}

	const handleSearchResultClick = (result: DataLayer) => {
		if (onItemClick) onItemClick(result)
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
