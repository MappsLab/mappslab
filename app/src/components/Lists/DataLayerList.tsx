import * as React from 'react'
import { Paginated, unwindEdges } from '@good-idea/unwind-edges'
import { DataLayer, Variables } from '../../types-ts'
import { DataLayersQuery } from '../../queries/DataLayer'
import { List } from './List'

/**
 * DataLayerList
 */

interface BaseProps {
	addNewDataLayer: (title: string) => Promise<void>
	removeDataLayer: (dataLayer: DataLayer) => Promise<void>
	dataLayers: DataLayer[]
	viewerCanAdd: boolean
	associateDataLayer: (dataLayer: DataLayer) => Promise<void>
	title: string
}

interface DataLayerListProps extends BaseProps {
	searchQuery: (vars: Variables) => Promise<void>
	searchResults: Paginated<DataLayer>
}

const DataLayerListMain = ({
	title,
	dataLayers,
	viewerCanAdd,
	addNewDataLayer,
	removeDataLayer,
	searchQuery,
	associateDataLayer,
	searchResults: paginatedSearchResults,
}: DataLayerListProps) => {
	const buttons = [
		{
			label: 'Remove',
			handler: removeDataLayer,
		},
	]

	const search = (searchValue: string) => {
		if (searchValue.length < 3) return
		searchQuery({
			where: {
				title: {
					contains: searchValue,
				},
			},
		})
	}

	const searchResults = paginatedSearchResults
		? unwindEdges(paginatedSearchResults)[0]
		: []

	const handleSearchResultClick = (result: DataLayer) => {
		associateDataLayer(result)
	}
	return (
		<List
			search={search}
			create={addNewDataLayer}
			searchResults={searchResults}
			onSearchResultClick={handleSearchResultClick}
			title={title}
			items={dataLayers}
			type="dataLayer"
			viewerCanAdd={viewerCanAdd}
			buttons={buttons}
		/>
	)
}

export const DataLayerList = (baseProps: BaseProps) => (
	<DataLayersQuery delayQuery>
		{({ data, refetch }) => (
			<DataLayerListMain
				searchQuery={refetch}
				searchResults={data && data.dataLayers ? data.dataLayers || [] : []}
				{...baseProps}
			/>
		)}
	</DataLayersQuery>
)
