import * as React from 'react'
import { DataLayer } from 'Types'
import { ListOfTypeProps, ListOfTypeBaseProps } from './utils'
import { List } from './List'

/**
 * DataLayerList
 */

interface DataLayerListProps {
	title: string
	dataLayers: DataLayer[]
	viewerCanAdd: boolean
	addNewDataLayer: (title: String) => Promise<void>
}

const noResults = async () => undefined
const handleClick = async () => undefined

export const DataLayerList = ({
	title,
	dataLayers,
	viewerCanAdd,
	addNewDataLayer,
}: DataLayerListProps) => {
	return (
		<List
			search={noResults}
			create={addNewDataLayer}
			onSearchResultClick={handleClick}
			title={title}
			items={dataLayers}
			type="dataLayer"
			viewerCanAdd={viewerCanAdd}
		/>
	)
}
